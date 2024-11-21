import React from 'react';

interface MessageProps {
  speaks: string;
  text: string;
}

const Message: React.FC<MessageProps> = ({ speaks, text }) => (
  <div className={`message-container ${speaks === 'bot' ? 'bg-secondary text-foreground' : 'bg-secondary text-primary'} p-2 px-4 flex rounded-lg shadow-md mb-2`}>
    <p
      className={`${speaks === 'bot' ? '' : 'ml-auto'}`}
      style={{ whiteSpace: 'pre-line' }}
    >
      {text}
    </p>
  </div>
);

export default Message;