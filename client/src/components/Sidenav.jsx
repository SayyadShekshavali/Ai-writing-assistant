// import React from "react";
import Spellchecker from "../images/spell-checker.png";
import Grammercheck from "../images/Grammer-checker.png";
import analys from "../images/analys.png";

function Sidenav({ clickedFeature }) {
  return (
    <div className="h-130 w-20 border-0 border-black ml-2 mt-1  -mr-2.5 rounted-t-none rounded-b-xl  block bg-slate-900  shadow-xl shadow-pink-200">
      <img
        className={
          "h-12 w-12  mt-30 m-3 shadow-xl shadow-blue-500/100 rounded-md transition-transform  duration-200 hover:scale-x-114 hover:scale-y-114"
        }
        src={Spellchecker}
        onClick={() => clickedFeature("Spellchecker")}
      />
      <img
        className={
          "h-12 w-12  mt-20 m-3  shadow-xl shadow-black rounded-md  transition-transform  duration-200 hover:scale-x-114 hover:scale-y-114"
        }
        src={Grammercheck}
        onClick={() => clickedFeature("Grammerchecker")}
      />
      <img
        className={
          "h-12 w-12  mt-20 m-3 mb-30 shadow-xl shadow-pink-400/100 rounded-md transition-transform  duration-200 hover:scale-x-114 hover:scale-y-114"
        }
        src={analys}
        onClick={() => clickedFeature("analys")}
      />
    </div>
  );
}

export default Sidenav;
