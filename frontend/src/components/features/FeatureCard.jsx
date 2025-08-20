import React from 'react';

const FeatureCard = ({ imageSrc, icon, title, children }) => {
  return (
    <div className="feature-card p-8 rounded-2xl flex flex-col items-center text-center h-full">
      {imageSrc ? (
        <img src={imageSrc} alt={title} className="h-32 w-32 mb-6 object-contain" />
      ) : (
        <div className="text-4xl text-purple-400 mb-5">{icon}</div>
      )}
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{children}</p>
    </div>
  );
};

export default FeatureCard;
