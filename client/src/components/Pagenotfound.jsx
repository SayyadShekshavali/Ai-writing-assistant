import React from "react";
import { useNavigate } from "react-router-dom";
function Pagenotfound() {
  const navigate = useNavigate();
  return (
    <div className="mt-50 text-center">
      <h1 className="!text-xl text-red-600 font-bold">404 Page not found</h1>
      <button
        className="h-auto w-auto border-1 border-black m-5 px-2  py-1 rounded-xl !text-xl bg-blue-500 "
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}

export default Pagenotfound;
