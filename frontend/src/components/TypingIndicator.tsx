import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-start mb-4">
      <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%] md:max-w-[70%]">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;