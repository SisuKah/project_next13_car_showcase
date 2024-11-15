import React from 'react';
import { manufacturers, yearsOfProduction, fuels, vaihteisto, tyyppi, korimalli } from '@constants/index'; // Adjust the import path as necessary

const AddCarsForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 mt-[100px]">Lisää Auto</h2>

      {/* Tyyppi Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Tyyppi</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
        <option value="">Valitse tyyppi</option>
        {tyyppi.map((option) => (
          <option key={option.value} value={option.value}>{option.title}</option>
        ))}
      </select>

      {/* Merkki Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Merkki</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
        <option value="">Valitse merkki</option>
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
        ))}
      </select>

      {/* Malli Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Malli</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg" disabled>
        <option value="">Valitse malli</option>
        {/* Add options dynamically if needed */}
      </select>

      {/* Korimalli Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Korimalli</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
        <option value="">Valitse korimalli</option>
        {korimalli.map((option) => (
          <option key={option.value} value={option.value}>{option.title}</option>
        ))}
      </select>

      {/* Käyttövoima Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Käyttövoima</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
        <option value="">Valitse käyttövoima</option>
        {fuels.map((fuel) => (
          <option key={fuel.value} value={fuel.value}>{fuel.title}</option>
        ))}
      </select>

      {/* Vaihteisto Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Vaihteisto</label>
      <select className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
        <option value="">Valitse vaihteisto</option>
        {vaihteisto.map((option) => (
          <option key={option.value} value={option.value}>{option.title}</option>
        ))}
      </select>

      {/* Vuosimalli Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Vuosimalli</label>
      <div className="flex space-x-2 mb-4">
        <input type="number" placeholder="Minimi" className="w-1/2 p-2 border border-gray-300 rounded-lg" />
        <input type="number" placeholder="Maksimi" className="w-1/2 p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* Hinta Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Hinta (€)</label>
      <input 
        type="number" 
        placeholder="Anna hinta" 
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg" 
      />
      <label className="block mb-2 text-sm font-medium text-gray-700">Mittarilukema (km)</label>
      <input 
        type="number" 
        placeholder="Anna mittarilukema" 
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg" 
      />

      {/* Lisää kuva */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Lisää kuva</label>
      <input type="file" className="w-full mb-4 p-2 border border-gray-300 rounded-lg" />

      {/* Tekstikenttä */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Lisätiedot</label>
      <textarea className="w-full mb-4 p-2 border border-gray-300 rounded-lg" placeholder="Kirjoita lisätietoja..." rows="4"></textarea>

      <button className="w-full p-2 bg-[#ff4c4c] text-white rounded-lg hover:bg-red-600">Lähetä</button>
    </div>
  );
};

export default AddCarsForm;
