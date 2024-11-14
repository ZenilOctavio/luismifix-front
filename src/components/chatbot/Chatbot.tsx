import React, { Component, createRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Message from './Message';
import Card from './Card';
import messageSound from './../../assets/open-ended.mp3';
import { API_URL } from '../../config/constants'; // Importa la URL de la API

const cookies = new Cookies();

interface TextMessage {
  text: { text: string };
}

interface CardPayload {
  structValue: {
    fields: {
      header: { stringValue: string };
      image: { stringValue: string };
      link: { stringValue: string };
      description: { stringValue: string };
    };
  };
}

interface PayloadMessage {
  payload: { fields: { cards: { listValue: { values: CardPayload[] } } } };
}

interface Message {
  speaks: string;
  message: TextMessage | PayloadMessage;
}

interface ChatbotState {
  messages: Message[];
  showBot: boolean;
  welcomeSent: boolean;
  botName: string;
}

class Chatbot extends Component<object, ChatbotState> {
  messagesEnd: React.RefObject<HTMLDivElement>;
  chatInput: React.RefObject<HTMLInputElement>;
  sound: HTMLAudioElement;
  userInteracted: boolean;

  constructor(props: object) {
    super(props);
    this.state = {
      messages: [],
      showBot: false,
      welcomeSent: false,
      botName: 'Chatbot',
    };

    this.sound = new Audio(messageSound);
    this.userInteracted = false;

    if (!cookies.get('userID')) {
      cookies.set('userID', uuid(), { path: '/' });
    }

    this.messagesEnd = createRef();
    this.chatInput = createRef();

    this.toggleBot = this.toggleBot.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.handleUserInteraction = this.handleUserInteraction.bind(this);
  }

  resolveAfterXSeconds(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(time);
      }, time * 1000);
    });
  }

  async componentDidMount() {
    if (!this.state.welcomeSent) {
      try {
        await this.resolveAfterXSeconds(2);
        await this.df_event_query('WELCOME_TO_SITE');
        this.setState({ welcomeSent: false, showBot: false });
      } catch (error) {
        console.error('Error during componentDidMount:', error);
      }
    }
  }

  componentDidUpdate() {
    if (this.state.showBot && this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (this.chatInput.current) {
      this.chatInput.current.focus();
    }
  }

  async df_text_query(text: string) {
    const says: Message = {
      speaks: 'me',
      message: {
        text: {
          text,
        },
      },
    };
    this.setState({
      messages: [...this.state.messages, says],
    });

    try {
      const res = await axios.post(`${API_URL}/api/df_text_query`, {
        text,
        userID: cookies.get('userID'),
      });

      if (res.data.action === 'input.whoAreYou' && res.data.allRequiredParamsPresent) {
        this.setState({ botName: res.data.parameters.fields.name.stringValue });
      }

      res.data.fulfillmentMessages.forEach((message: TextMessage | PayloadMessage) => {
        const says: Message = {
          speaks: 'bot',
          message,
        };
        this.setState({
          messages: [...this.state.messages, says],
        });
      });

      if (this.userInteracted) {
        this.sound.play();
      }
    } catch (error) {
      console.error('Error during df_text_query:', error);
    }
  }

  async df_event_query(event: string) {
    try {
      const res = await axios.post(`${API_URL}/api/df_event_query`, {
        event,
        userID: cookies.get('userID'),
      });

      for (const msg of res.data.fulfillmentMessages) {
        const says: Message = {
          speaks: 'bot',
          message: msg,
        };
        this.setState({ messages: [...this.state.messages, says] });
      }
      if (this.userInteracted) {
        this.sound.play();
      }
    } catch (error) {
      console.error('Error during df_event_query:', error);
    }
  }

  isNormalMessage(message: Message): message is { speaks: string; message: TextMessage } {
    return 'text' in message.message;
  }

  isMessageCard(message: Message): message is { speaks: string; message: PayloadMessage } {
    return 'payload' in message.message;
  }

  renderCards(cards: CardPayload[]) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message: Message, i: number) {
    if (this.isNormalMessage(message)) {
      return (
        <div key={i} className={`message ${message.speaks}`}>
          <Message speaks={message.speaks} text={message.message.text.text} />
        </div>
      );
    } else if (this.isMessageCard(message)) {
      return (
        <div key={i} className={`message ${message.speaks}`}>
          <div className="container">
            <div className="card-container">
              {this.renderCards(message.message.payload.fields.cards.listValue.values)}
            </div>
          </div>
        </div>
      );
    }
  }

  renderMessages(stateMessages: Message[]) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    }
    return null;
  }

  handleUserInteraction() {
    this.userInteracted = true;
  }

  toggleBot() {
    this.setState({ showBot: !this.state.showBot });
    this.handleUserInteraction();
  }

  _handleInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
      this.df_text_query(e.currentTarget.value);
      e.currentTarget.value = '';
      this.handleUserInteraction();
    }
  }

  render() {
    const { showBot, botName } = this.state;

    if (showBot) {
      return (
        <div className="fixed bottom-5 right-5 z-50 w-72 h-96 bg-background rounded-lg shadow-lg flex flex-col">
          <nav className="bg-primary text-foreground p-4 rounded-t-lg flex justify-between items-center">
            <span>{botName}</span>
            <span className="cursor-pointer" onClick={this.toggleBot}>
              x
            </span>
          </nav>
          <div className="flex-1 overflow-y-auto p-4">
            {this.renderMessages(this.state.messages)}
            <div ref={this.messagesEnd} />
          </div>
          <input
            type="text"
            ref={this.chatInput}
            className="w-full p-3 border-t border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground bg-background"
            placeholder="Start Talking to the bot!"
            onKeyPress={this._handleInputKeyPress}
          />
        </div>
      );
    } else {
      return (
        <div className="fixed bottom-5 right-5 z-50 w-72 bg-primary text-foreground p-4 rounded-lg shadow-lg cursor-pointer" onClick={this.toggleBot}>
          <span>{botName}</span>
        </div>
      );
    }
  }
}

export default Chatbot;