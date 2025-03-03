import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
function Navbar() {
  return (
    <>
      <div className="  h-15 w-315  mt-1 ml-2 -mr-2  flex  bg-grey-900/50 text-xl border-1 border-black  ">
        <img className={"  mt-2 m-3  rounded-md "} src={Logo} />
        <Link
          to="/"
          className="h-10 w-14 mt-2 flex items-center   pl-1.5 text-1xl font-mono font-bold ml-20 text-red-500  hover:shadow-[0_5px_0px_rgba(0,0,0,0.7)]
        hover:rounded-xs transition-transform duration-500 hover:-translate-y-1
"
        >
          Home
        </Link>
        <Link
          to="/write"
          className="h-10 w-14 mt-2 flex items-center   ml-20 text-red-600  hover:shadow-[0_5px_0px_rgba(0,0,0,0.7)]
        hover:rounded-xs transition-transform duration-500 hover:-translate-y-1   text-1xl font-mono font-bold"
        >
          Write
        </Link>

        <Link
          to="/login"
          className="h-10 w-14 mt-2 flex items-center   ml-180 text-red-600  hover:shadow-[0_5px_0px_rgba(0,0,0,0.7)]
        hover:rounded-xs transition-transform duration-500 hover:-translate-y-2   text-1xl font-mono font-bold"
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default Navbar;
