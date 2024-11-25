'use client';

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../../firebase';
import { manufacturers, fuels, vaihteisto, tyyppi, korimalli } from '@constants/index';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddCarsForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [imageInputs, setImageInputs] = useState([0]); // Start with one image input field for additional images
  const [firstImageUrl, setFirstImageUrl] = useState<string | null>(null); // Store first image URL

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);  // Save user's email
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Extract car data
    const carData = {
      tyyppi: formData.get('tyyppi'),
      merkki: formData.get('merkki'),
      korimalli: formData.get('korimalli'),
      kayttovoima: formData.get('kayttovoima'),
      vaihteisto: formData.get('vaihteisto'),
      vuosimalli_min: formData.get('vuosimalli_min'),
      vuosimalli_max: formData.get('vuosimalli_max'),
      hinta: formData.get('hinta'),
      mittarilukema: formData.get('mittarilukema'),
      lisatiedot: formData.get('lisatiedot'),
      email: userEmail, // Add email to car data
      publishedDate: Timestamp.fromDate(new Date()), // Add the current date and time
      imageUrl: firstImageUrl, // Store the first image URL
    };

    // Handle additional images (11 maximum)
    let imageUrls = [];
    for (let i = 1; i < imageInputs.length; i++) {
      const imageFile = formData.get(`kuva_${i}`);
      if (imageFile) {
        const imageRef = ref(storage, `cars/${(imageFile as File).name}-${Date.now()}`);
        try {
          const snapshot = await uploadBytes(imageRef, imageFile as Blob);
          const imageUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading additional image: ", error);
          alert("Error uploading additional image. Please try again.");
          return;
        }
      }
    }

    try {
      // Add car data with image URL and additional image URLs to Firestore
      await addDoc(collection(db, 'cars'), {
        ...carData,
        imageUrls: imageUrls, // Store additional images in a separate field 'imageUrls'
      });      
      alert("Car added successfully!");
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding car: ", error);
      alert("Error adding car!");
    }
  };

  const handleDeleteImageInput = (index: number) => {
    setImageInputs((prev) => prev.filter((_, i) => i !== index)); // Remove the image input at the given index
  };

  const addImageInput = () => {
    if (imageInputs.length < 12) {
      setImageInputs((prev) => [...prev, prev.length]); // Add a new input field up to 12
    } else {
      alert("You can only add up to 12 images.");
    }
  };

  const handleFirstImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const firstImageRef = ref(storage, `cars/${file.name}-${Date.now()}`);
      try {
        const snapshot = await uploadBytes(firstImageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);
        setFirstImageUrl(imageUrl); // Set the first image URL
      } catch (error) {
        console.error("Error uploading first image: ", error);
        alert("Error uploading first image. Please try again.");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Please log in to add a car.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 mt-[100px]">Lisää Auto</h2>
      <form id="add-car" onSubmit={handleFormSubmit}>
        {/* Merkki Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Merkki *</label>
        <select name="merkki" className="w-full mb-4 p-2 border border-gray-300 rounded-lg" required>
          <option value="">Valitse merkki</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer} value={manufacturer}>
              {manufacturer}
            </option>
          ))}
        </select>

        {/* Korimalli Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Korimalli</label>
        <select name="korimalli" className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
          <option value="">Valitse korimalli</option>
          {korimalli.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>

        {/* Käyttövoima Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Käyttövoima</label>
        <select name="kayttovoima" className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
          <option value="">Valitse käyttövoima</option>
          {fuels.map((fuel) => (
            <option key={fuel.value} value={fuel.value}>
              {fuel.title}
            </option>
          ))}
        </select>

        {/* Vaihteisto Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Vaihteisto</label>
        <select name="vaihteisto" className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
          <option value="">Valitse vaihteisto</option>
          {vaihteisto.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>

        {/* Tyyppi Dropdown */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Tyyppi</label>
        <select name="tyyppi" className="w-full mb-4 p-2 border border-gray-300 rounded-lg">
          <option value="">Valitse tyyppi</option>
          {tyyppi.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>

        {/* Vuosimalli Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Vuosimalli</label>
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            name="vuosimalli_min"
            placeholder="Minimi"
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="vuosimalli_max"
            placeholder="Maksimi"
            className="w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Hinta Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Hinta (€) *</label>
        <input
          type="number"
          name="hinta"
          placeholder="Anna hinta"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          required
        />

        {/* Mittarilukema Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Mittarilukema (km)</label>
        <input
          type="number"
          name="mittarilukema"
          placeholder="Anna mittarilukema"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />

        {/* First image input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lisää 1 kuva *</label>
          <input
            type="file"
            name="kuva_0"
            className="w-full p-2 border border-gray-300 rounded-lg"
            accept="image/*"
            onChange={handleFirstImageChange} // Handle first image upload
            required
          />
          {firstImageUrl && (
            <div className="mt-2">
              <img src={firstImageUrl} alt="First Image" className="max-w-[200px] h-auto" />
            </div>
          )}
        </div>

        {/* Additional images inputs */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Lisää enintään 11 muuta kuvaa</label>
          {imageInputs.slice(1).map((_, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="file"
                name={`kuva_${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded-lg"
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => handleDeleteImageInput(index + 1)} // Delete the input field
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageInput}
            className="text-blue-500 hover:underline"
          >
            Lisää toinen kuva (max 11)
          </button>
        </div>

        {/* Lisätiedot */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Lisätiedot</label>
        <textarea
          name="lisatiedot"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Kirjoita lisätiedot"
        />

        {/* Submit button */}
        <button className="w-full p-2 bg-[#ff4c4c] text-white rounded-lg hover:bg-red-600">
          Lähetä
        </button>
      </form>
    </div>
  );
};

export default AddCarsForm;
