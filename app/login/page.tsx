"use client";

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase'; // Ensure you have initialized Firebase in a separate file and imported it here.

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      if (isRegistering) {
        // Registration logic
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess(true);
      } else {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess(true);
      }
    } catch (err) {
      setError(
        isRegistering ? 'Rekisteröinnissä tapahtui virhe. Tarkista tiedot.' : 'Virhe: Tarkista sähköpostisi tai salasanasi.'
      );
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Rekisteröidy AutoNettiin!' : 'Tervetuloa AutoNettiin!'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{isRegistering ? 'Rekisteröinti onnistui!' : 'Kirjautuminen onnistui!'}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Sähköpostiosoite
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Syötä sähköpostisi"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Salasana
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Syötä salasanasi"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4c4c] text-white py-2 rounded hover:bg-[#ff4c4c] focus:outline-none focus:ring-2 focus:ring-[#ff4c4c]"
          >
            {isRegistering ? 'Rekisteröidy' : 'Kirjaudu sisään'}
          </button>

        </form>
        <p className="mt-4 text-center">
          {isRegistering ? 'Onko sinulla jo tili?' : 'Eikö sinulla ole vielä tiliä?'}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline ml-2"
          >
            {isRegistering ? 'Kirjaudu sisään' : 'Rekisteröidy'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
