import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "AutoNetti",
  description: "Kokeile rohkeasti palveluamme, niin näet kuinka nopeasti autosi myydään.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
