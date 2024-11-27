"use client";

import { db } from '@firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Slider, createTheme, ThemeProvider } from '@mui/material';
import {fuels, tyyppi, vaihteisto, korimalli, yearsOfProduction} from '../constants/index';


interface Car {
  id: string;
  imageUrl?: string;
  model?: string;
  merkki?: string;
  hinta?: number;
  vuosimalli_min?: number;
  vuosimalli_max?: number;
  kayttovoima?: string;  // fuel
  tyyppi?: string;       // type
  vaihteisto?: string;   // transmission
  korimalli?: string;    // bodyType
  publishedAt?: string;  // publishing time
}

interface CarGridProps {
  cars: Car[];
}

const CarGrid: React.FC<CarGridProps> = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 120000]); // default range
  const [fuelFilter, setFuelFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('');
  const [bodyTypeFilter, setBodyTypeFilter] = useState<string>('');
  const [yearRange, setYearRange] = useState<number[]>([1700, 2050]); // Adjust default range to match your data


  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const carCollection = collection(db, 'cars');
        const carSnapshot = await getDocs(carCollection);
        const carList = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Cars:', carList); // Debugging: Check the structure of fetched data
        setCars(carList);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Normalize and filter cars
  const filteredCars = cars.filter((car) => {
    const normalizedFuel = fuelFilter.trim().toLowerCase();
    const normalizedType = typeFilter.trim().toLowerCase();
    const normalizedTransmission = transmissionFilter.trim().toLowerCase();
    const normalizedBodyType = bodyTypeFilter.trim().toLowerCase();
  
    const carFuel = car.kayttovoima?.trim().toLowerCase();
    const carType = car.tyyppi?.trim().toLowerCase();
    const carTransmission = car.vaihteisto?.trim().toLowerCase();
    const carBodyType = car.korimalli?.trim().toLowerCase();
    const carMerkki = car.merkki?.trim().toLowerCase();
    const carPrice = car.hinta || 0;
    const carYear = car.vuosimalli_min || 0; // Get the year from the car data
  
    return (
      (filter ? carMerkki?.includes(filter.toLowerCase()) : true) &&
      (fuelFilter ? carFuel === normalizedFuel : true) &&
      (typeFilter ? carType === normalizedType : true) &&
      (transmissionFilter ? carTransmission === normalizedTransmission : true) &&
      (bodyTypeFilter ? carBodyType === normalizedBodyType : true) &&
      (carPrice >= priceRange[0] && carPrice <= priceRange[1]) &&
      (carYear >= yearRange[0] && carYear <= yearRange[1]) // Filter cars based on selected year range
    );
  });

  // Sort cars by publishing time (most recent first)
  // Sort cars by publishing time (most recent first)
  const sortedCars = filteredCars.sort((a, b) => {
    const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;

    // If the date is invalid, treat it as the earliest possible time (0)
    if (isNaN(timeA)) return 1;  // If A is invalid, move it down
    if (isNaN(timeB)) return -1; // If B is invalid, move it down

    return timeB - timeA;  // Sort latest first
  });

  


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
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Suodata merkin mukaan"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4 px-5">
        <ThemeProvider theme={createTheme()}>
          <Slider
            value={priceRange}
            onChange={(event, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={120000}
            step={100}
            marks={[
              { value: 0, label: '0 €' },
              { value: 60000, label: '60 000 €' },
              { value: 120000, label: '120 000 €' },            ]}
            sx={{
              color: '#FF5733',  // Track color
              '& .MuiSlider-thumb': {
                backgroundColor: '#ff4c4c', // Thumb color
              },
            }}
          />
        </ThemeProvider>
        <ThemeProvider theme={createTheme()}>
          <Slider
            value={yearRange}
            onChange={(event, newValue) => setYearRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={1700}
            max={2050}
            step={1}
            marks={[
              { value: 1700, label: '1700' },
              { value: 2050, label: '2050' },
            ]}
            sx={{
              color: '#FF5733',  // Track color
              '& .MuiSlider-thumb': {
                backgroundColor: '#ff4c4c', // Thumb color
              },
            }}
          />
        </ThemeProvider>
      </div>

      {/* Fuel, Type, Transmission, and Body Type filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 pb-[30px]">
        <div>
          <select 
            value={fuelFilter} 
            onChange={(e) => setFuelFilter(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] transition ease-in-out duration-300">
            {fuels.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] transition ease-in-out duration-300">
            {tyyppi.map((type) => (
              <option key={type.value} value={type.value}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select 
            value={transmissionFilter} 
            onChange={(e) => setTransmissionFilter(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] transition ease-in-out duration-300">
            {vaihteisto.map((transmission) => (
              <option key={transmission.value} value={transmission.value}>
                {transmission.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select 
            value={bodyTypeFilter} 
            onChange={(e) => setBodyTypeFilter(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4c4c] transition ease-in-out duration-300">
            {korimalli.map((bodyType) => (
              <option key={bodyType.value} value={bodyType.value}>
                {bodyType.title}
              </option>
            ))}
          </select>
        </div>
      </div>


      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedCars.length > 0 ? (
          sortedCars.map((car) => (
            <Link key={car.id} href={`/autot/${car.id}`}>
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <img src={car.imageUrl || 'https://via.placeholder.com/150'} alt={car.model} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{car.merkki} {car.model}</h3>
                  <p className="text-sm text-gray-500">{car.vaihteisto}</p>
                  <p className="text-lg font-bold">{car.hinta} €</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center">No cars found matching filters</p>
        )}
      </div>
    </div>
  );
};

export default CarGrid;
