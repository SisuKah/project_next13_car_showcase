"use client";

import { db } from '@firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
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

  const handleDelete = async (carId: string) => {
    try {
      const carDocRef = doc(db, 'cars', carId);
      await deleteDoc(carDocRef);
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId)); // Remove car from state after deletion
      alert('Auto poistettiin onnistuneesti');
    } catch (error) {
      console.error('Error poistaessa autoa:', error);
      alert('Autoa ei voitu poistaa');
    }
  };

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
        <div key={car.id} className="relative">
          <Link href={`/autot/${car.id}`}>
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
          <button
            onClick={() => handleDelete(car.id)}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
          >
            Poista
          </button>
        </div>
      ))}
    </div>
  );
};

export default OwnCars;
