"use client";

import { db } from '@firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface Car {
  id: string;
  imageUrl?: string;
  model?: string;
  merkki?: string;
  hinta?: number;
  vuosimalli_min?: number;
  vuosimalli_max?: number;
}

interface CarGridProps {
  cars: Car[];
}

const CarGrid: React.FC<CarGridProps> = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      try {
        const carCollection = collection(db, 'cars'); // Reference the 'cars' collection
        const carSnapshot = await getDocs(carCollection); // Get all documents
        const carList = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carList); // Set the car data in state
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
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
        <Link key={car.id} href={`/autot/${car.id}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <img
              src={car.imageUrl || '/placeholder.jpg'}
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
