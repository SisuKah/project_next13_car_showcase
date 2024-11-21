"use client";

import { db } from '@firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link'; // Import Link

interface Car {
  id: string;
  imageUrl?: string;
  model?: string;
  merkki?: string;
  hinta?: number;
  vuosimalli_min?: number;
  vuosimalli_max?: number;
}

const CarGrid = () => {
  const [cars, setCars] = useState<Car[]>([]); // State to store car data
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Fetch car data from Firestore
    const fetchCars = async () => {
      try {
        const carCollection = collection(db, 'cars'); // Reference the 'cars' collection
        const carSnapshot = await getDocs(carCollection); // Get all documents
        const carList = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the document data into the object
        }));
        setCars(carList); // Set the car data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading cars...</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">No cars available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {cars.map((car) => (
        <Link key={car.id} href={`/omat-autot/${car.id}`}> {/* Wrap the card with a link to the car detail page */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <img
              src={car.imageUrl || '/placeholder.jpg'} // Fallback if no imageUrl is provided
              alt={car.model || 'Car Image'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.merkki || 'Unknown Model'}</h3>
              <p className="text-xl font-bold text-gray-800">{car.hinta ? `${car.hinta} €` : 'Price not available'}</p>
              <p className="text-sm text-gray-600">
                {`${car.vuosimalli_min || 'Unknown Year'} - ${car.vuosimalli_max || 'Unknown Year'}`}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarGrid;
