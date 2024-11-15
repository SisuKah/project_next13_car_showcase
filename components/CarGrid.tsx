import React from 'react';

const cars = [
  {
    id: 1,
    image: '/volvo.avif',
    model: 'Volvo XC60',
    price: '29,970 €',
    specs: '2.0, 194 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  {
    id: 2,
    image: '/mercedes.jpg',
    model: 'Mercedes-Benz E 53 AMG',
    price: '99,900 €',
    specs: '3.0, 22, 33 km',
  },
  // Add more car objects as needed
];

const CarGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cars.map((car) => (
        <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{car.model}</h3>
            <p className="text-xl font-bold text-gray-800">{car.price}</p>
            <p className="text-sm text-gray-600">{car.specs}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarGrid;
