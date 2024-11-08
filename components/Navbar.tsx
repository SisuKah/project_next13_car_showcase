import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className="w-full absolute z-10 bg-red-theme">
    <nav className="flex justify-between items-center sm:px-16 px-6 py-4">
      <Link href="/" className="flex justify-center items-center">
        <div className="open-sans font-[900] text-white text-2xl">
          AUTONETTI
        </div>
      </Link>

      <CustomButton
        title="Kirjaudu"
        btnType="button"
        containerStyles="text-white rounded-full text-xl"
      />
    </nav>
  </header>
);

export default NavBar;
