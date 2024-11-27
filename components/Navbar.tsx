"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Ensure your Firebase app is initialized here
import Button from "./CustomButton";
import { FaBars } from "react-icons/fa"; // For the hamburger icon

const NavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="w-full absolute z-10 bg-red-theme">
      <nav className="flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <div className="open-sans font-[900] text-white text-2xl">AUTONETTI</div>
        </Link>
        {isMobile ? (
          <div className="ml-auto">
            <FaBars
              className="text-white text-2xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-6 top-16 bg-red-theme p-4 rounded shadow-lg">
                <Button
                  title="Yhteystiedot"
                  containerStyles="text-white rounded-full text-xl mb-2"
                  handleClick={() => {
                    router.push("/your-route");
                    setMenuOpen(false);
                  }}
                />
                <Button
                  title="Hinnasto"
                  containerStyles="text-white rounded-full text-xl mb-2"
                  handleClick={() => {
                    router.push("/your-route");
                    setMenuOpen(false);
                  }}
                />
                {user ? (
                  <>
                    <Button
                      title="Lisää Auto"
                      containerStyles="text-white rounded-full text-xl mb-2"
                      handleClick={() => {
                        router.push("/lisaa-auto");
                        setMenuOpen(false);
                      }}
                    />
                    <Button
                      title="Omat autot"
                      containerStyles="text-white rounded-full text-xl mb-2"
                      handleClick={() => {
                        router.push("/omat-autot");
                        setMenuOpen(false);
                      }}
                    />
                    <CustomButton
                      title="Kirjaudu ulos"
                      btnType="button"
                      containerStyles="text-white rounded-full text-xl border-2 border-white mb-2"
                      handleClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                    />
                  </>
                ) : (
                  <CustomButton
                    title="Kirjaudu"
                    btnType="button"
                    containerStyles="text-white rounded-full text-xl border-2 border-white mb-2"
                    handleClick={() => {
                      handleLoginClick();
                      setMenuOpen(false);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="ml-auto flex items-center space-x-4">
            <Button
              title="Yhteystiedot"
              containerStyles="text-white rounded-full text-xl"
              handleClick={() => router.push("/your-route")}
            />
            <Button
              title="Hinnasto"
              containerStyles="text-white rounded-full text-xl"
              handleClick={() => router.push("/your-route")}
            />
            {user ? (
              <>
                <Button
                  title="Lisää Auto"
                  containerStyles="text-white rounded-full text-xl"
                  handleClick={() => router.push("/lisaa-auto")}
                />
                <Button
                  title="Omat autot"
                  containerStyles="text-white rounded-full text-xl"
                  handleClick={() => router.push("/omat-autot")}
                />
                <CustomButton
                  title="Kirjaudu ulos"
                  btnType="button"
                  containerStyles="text-white rounded-full text-xl border-2 border-white"
                  handleClick={handleLogout}
                />
              </>
            ) : (
              <CustomButton
                title="Kirjaudu"
                btnType="button"
                containerStyles="text-white rounded-full text-xl border-2 border-white"
                handleClick={handleLoginClick}
              />
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
