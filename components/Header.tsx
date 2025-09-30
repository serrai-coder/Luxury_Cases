
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 font-playfair tracking-widest">
          <span className="text-yellow-600">Luxury</span> Cases DZ
        </h1>
        <p className="text-sm text-gray-500 tracking-wider mt-1">
          L'élégance à portée de main
        </p>
      </div>
    </header>
  );
};

export default Header;