"use client";

import { db } from '@firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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

const OwnCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnCars = async () => {
      setLoading(true);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userEmail = user.email; // Get the logged-in user's email
          const carCollection = collection(db, 'cars');
          const q = query(carCollection, where('email', '==', userEmail)); // Filter cars by email
          const carSnapshot = await getDocs(q);
          const carList = carSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCars(carList); // Set user's cars in state
        } else {
          console.error('No user is logged in.');
          setCars([]);
        }
      } catch (error) {
        console.error('Error fetching own cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading your cars...</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">You have no cars listed.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-[150px]">
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

export default OwnCars;
