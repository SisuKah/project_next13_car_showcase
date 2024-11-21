"use client";

import { db } from '@app/firebase'; // Adjust this path if needed
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation'; // Correct hook for dynamic route params in the App Router

interface Car {
  id: string;
  imageUrl?: string;
  model?: string;
  merkki?: string;
  hinta?: number;
  vuosimalli_min?: number;
  vuosimalli_max?: number;
  description?: string;
  email?: string; // User's email
  tyyppi?: string;
  korimalli?: string;
  kayttovoima?: string;
  vaihteisto?: string;
  mittarilukema?: number;
  lisatiedot?: string;
}

const CarDetail = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams() as { id: string }; // Use useParams to get the dynamic route parameter

  useEffect(() => {
    if (!id) return; // Wait for the ID to be available

    const fetchCar = async () => {
      try {
        const carDoc = doc(db, 'cars', id); // Reference the car by its ID
        const carSnapshot = await getDoc(carDoc);
        if (carSnapshot.exists()) {
          setCar({ id: carSnapshot.id, ...carSnapshot.data() });
        } else {
          setError('Autoa ei löytynyt');
        }
      } catch (error) {
        setError('Virhe auton tietojen hakemisessa');
        console.error(error);
      }
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold">Ladataan auton tietoja...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold">Auton tietoja ei ole saatavilla.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 pt-[150px]">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
        <img
          src={car.imageUrl || '/placeholder.jpg'}
          alt={car.model || 'Auton kuva'}
          className="w-full h-96 object-contain"
        />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25"></div>
        </div>
        
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{car.merkki || ''}</h2>
          <p className="text-lg font-semibold text-gray-600">{car.model || ''}</p>
          <p className="text-xl font-bold text-blue-600">{car.hinta ? `${car.hinta} €` : ''}</p>
          

          {car.description && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-700">Kuvaus:</h3>
              <p className="text-lg text-gray-700">{car.description}</p>
            </div>
          )}

          {car.tyyppi || car.korimalli || car.kayttovoima || car.vaihteisto || car.vuosimalli_min || car.mittarilukema || car.hinta ? (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Tekniset tiedot:</h3>
              <ul className="text-lg text-gray-600 list-disc pl-5">
                {car.tyyppi && <li>Tyyppi: {car.tyyppi}</li>}
                {car.korimalli && <li>Korimalli: {car.korimalli}</li>}
                {car.kayttovoima && <li>Käyttövoima: {car.kayttovoima}</li>}
                {car.vaihteisto && <li>Vaihteisto: {car.vaihteisto}</li>}
                {car.vuosimalli_min && car.vuosimalli_max && <li>Vuosimalli: {car.vuosimalli_min} - {car.vuosimalli_max}</li>}
                {car.mittarilukema && <li>Mittarilukema: {car.mittarilukema} km</li>}
                {car.hinta && <li>Hinta: {car.hinta} €</li>}
              </ul>
            </div>
          ) : null}

          {car.lisatiedot && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Lisätiedot:</h3>
              <p className="text-lg text-gray-600">{car.lisatiedot}</p>
            </div>
          )}

          {car.email && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Yhteydenotto:</h3>
              <p className="text-lg text-gray-600">{car.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
