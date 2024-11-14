import React from 'react';

interface CardProps {
  payload: {
    fields: {
      header: { stringValue: string };
      image: { stringValue: string };
      link: { stringValue: string };
      description: { stringValue: string };
    };
  };
}

const Card: React.FC<CardProps> = ({ payload }) => (
  <div className="card bg-white shadow-md rounded-lg p-4 m-2">
    <div className="card-image">
      <img src={payload.fields.image.stringValue} alt={payload.fields.header.stringValue} className="w-full h-32 object-cover rounded-t-lg" />
    </div>
    <div className="card-content mt-2">
      <h3 className="text-lg font-bold">{payload.fields.header.stringValue}</h3>
      <p className="text-sm">{payload.fields.description.stringValue}</p>
      <a href={payload.fields.link.stringValue} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Learn more
      </a>
    </div>
  </div>
);

export default Card;