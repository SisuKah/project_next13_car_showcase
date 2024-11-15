"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../app/firebase"; // Ensure your Firebase app is initialized here
import Button from "./CustomButton";

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('/');
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <header className="w-full absolute z-10 bg-red-theme">
      <nav className="flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <div className="open-sans font-[900] text-white text-2xl">
            AUTONETTI
          </div>
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <Button 
              title={"Lisää Auto"}
              containerStyles="text-white rounded-full text-xl"
            />
            <CustomButton
              title="Kirjaudu ulos"
              btnType="button"
              containerStyles="text-white rounded-full text-xl"
              handleClick={handleLogout}
            />
          </div>
        ) : (
          <CustomButton
            title="Kirjaudu"
            btnType="button"
            containerStyles="text-white rounded-full text-xl"
            handleClick={handleLoginClick}
          />
        )}
      </nav>
    </header>
  );
};

export default NavBar;
