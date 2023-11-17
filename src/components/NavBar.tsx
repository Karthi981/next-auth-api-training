import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <div className=" text-gray-600  shadow-md w-[1200px] ">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 ">
        <div className="text-2xl font-bold">
          <Image
            src={"https://coursesity.com/assets/images/logo.png"}
            alt="coursesity"
            width="142"
            height="32"
            className="img-fluid"
          />
        </div>
        <div className="hidden md:flex space-x-3">
          <a href="#" className="hover:underline px-2 py-2">
            Subject
          </a>
          <a href="#" className="hover:underline px-2 py-2">
            Free Courses
          </a>
          <div className="relative group">
            <Link href="/Courses">
              <button className="hover:underline focus:outline-none px-2 py-2 ">
                Courses
              </button>
            </Link>
            <div className="absolute hidden group-hover:block right-0 mt-2 bg-white border border-gray-300 w-48 shadow-md">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 bg-white"
              >
                Free Courses
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 bg-white"
              >
                Universities
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 bg-white"
              >
                Best Courses
              </a>
            </div>
          </div>
          <Link href="/SignIn" className="hover:underline px-2 py-2 ">
            Login
          </Link>
          <div className=" px-2 py-2 text-base font-semibold bg-red-500 text-white rounded-5 border-1 border-red-500 uppercase tracking-wider rounded-md">
            <Link href="/SignUp">
              <button>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
