import Image from "next/image";
import { Inter } from "next/font/google";
import NavBar from "@/src/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center   ${inter.className}`}
    >
      <div className="items-start">
        <div>
          <NavBar />
        </div>
        <div className="justify-center py-24 px-24 items-center font-bold text-3xl">
          Home
        </div>
      </div>
    </main>
  );
}
