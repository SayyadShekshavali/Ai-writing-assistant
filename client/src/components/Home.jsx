import ai from "../images/ai.jpg";
import Spellchecker from "../images/spell-checker.png";
import Grammercheck from "../images/Grammer-checker.png";
import analys from "../images/analys.png";

function Home() {
  return (
    <div className=" h-110 w-210 flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <div className=" mt-90">
        <img
          src={ai}
          alt="AI Assist"
          className="w-60 h-60 object-cover rounded-lg shadow-lg ml-35"
        />

        <h1 className="text-3xl font-bold mt-6 text-gray-800">
          Welcome to AI Assist
        </h1>
        <p className="text-gray-600 mt-2 mb-11 text-center max-w-md">
          AI Assist helps you solve problems, generate ideas, and improve
          efficiency. Experience the power of artificial intelligence in your
          daily tasks.
        </p>
      </div>
      <h1 className="text-4xl font-bold mt-6 mb-20 text-gray-800">About </h1>
      <div className="  flex w-210 ">
        <div className="h-auto w-70  ml-0 mr-5">
          <p className="text-xl font-bold">Grammar Checker</p>
          <img className="h-30 w-30 ml-16 mt-4 mb-7 " src={Spellchecker} />
          <p className="text-pink-500">
            Identifies and corrects grammatical errors, ensuring proper sentence
            structure, punctuation, and tense usage.
          </p>
        </div>
        <div className="h-auto w-70 ">
          <p className="text-xl font-bold">Spell Checker</p>
          <img className="h-30 w-30 ml-16 mt-4 mb-7" src={Grammercheck} />
          <p className="text-indigo-500">
            Detects and corrects spelling mistakes by comparing words against a
            dictionary and considering context.
          </p>
        </div>
        <div className="h-auto w-70  ml-5">
          <p className="text-xl font-bold">Rephrase Sentence</p>
          <img className="h-30 w-30 ml-16 mt-4 mb-7" src={analys} />
          <p className="text-green-500">
            Rewrites sentences while preserving meaning, improving clarity,
            readability, and style.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
