import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Navbar from "./components/Navbar";
import Answers from "./components/Answers";
import Home from "./components/Home";
import Write from "./components/Write";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [selectedFeature, setSelectedFeature] = useState("");
  const [sentence, setSentence] = useState("");
  const handleFeatureClick = (feature) => {
    console.log("Clicked:", feature);
    setSelectedFeature(feature);
  };
  return (
    <div className="h-143 w-317  ml-5 ">
      <BrowserRouter>
        <Navbar className="h-16 w-350 fixed top-0 left-64 bg-blue-600 border-2 border-black " />
        <div className="h- w-dvw flex">
          <Sidenav
            className="w-64 h-full fixed left-0 top-0 bg-gray-800 "
            clickedFeature={handleFeatureClick}
          />

          <div className=" mt-1 ml-3 h-130 w-220 overflow-auto border-0 border-black">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/write"
                element={
                  <Write
                    sentence={sentence}
                    setSentence={setSentence}
                    selectedFeature={selectedFeature}
                    setSelectedFeature={handleFeatureClick}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Answers
            selectedFeature={selectedFeature}
            setSelectedFeature={handleFeatureClick}
            sentence={sentence}
            className="h-dvh w-full fixed top-10 right-0 bg-blue-600 text-white"
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
