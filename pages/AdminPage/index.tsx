import NavBar from "@/src/components/NavBar";
import React from "react";
import { useSession } from "next-auth/react";
const AdminPage = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-white min-h-screen ">
      <div className=" w-full items-center justify-center">
        <NavBar />
        <div>AdminPage</div>
        <h1 className="text-2xl py-6 text-red-400 justify-center items-center">
          Welcome Admin {session?.user?.name}
        </h1>
      </div>
    </div>
  );
};

export default AdminPage;
