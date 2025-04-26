import { useState, useEffect } from "react";

function Write({ sentence, setSentence, selectedFeature, setSelectedFeature }) {
  const [spellCheckResult, setSpellCheckResult] = useState(null);
  const [grammarCheckResult, setGrammarCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpellChecker = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-writing-assistant-mnqz.onrender.com/api/spellchecker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setSpellCheckResult(data.correctedText);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGrammarChecker = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ai-writing-assistant-mnqz.onrender.com/api/grammerchecker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setGrammarCheckResult(data.correctedText);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFeature === "Spellchecker") {
      handleSpellChecker();
    }
    if (selectedFeature === "Grammerchecker") {
      handleGrammarChecker();
    }
  }, [selectedFeature]);

  return (
    <div className="mt-10 border-t-1 border-black p-5 rounded shadow-md shadow-pink-800">
      <h1 className="text-4xl text-blue-600 font-bold text-center mb-5">
        AI Writing Assistant
      </h1>

      <textarea
        placeholder="Type your text here..."
        className="w-full h-40 p-3 text-xl border-2 border-black rounded-lg"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      ></textarea>

      <div className="flex gap-5 mt-5">
        <div className="flex-1 bg-gray-100 p-5 rounded-xl shadow-xl">
          <button
            className="w-30 ml-30 p-2 bg-blue-600 text-white rounded-lg transition-transform duration-500 hover:-translate-y-2"
            onClick={() => setSelectedFeature("Spellchecker")}
          >
            Spellchecker
          </button>
          {loading && selectedFeature === "Spellchecker" ? (
            <p className="mt-3 text-lg font-bold text-black">Checking...</p>
          ) : spellCheckResult ? (
            <p className="mt-3 text-lg font-bold text-black">
              {spellCheckResult}
            </p>
          ) : null}
        </div>

        <div className="flex-1 bg-gray-100 p-5 rounded-xl shadow-xl">
          <button
            className="w-40 p-2 bg-blue-600 text-white rounded-lg rounded-xl ml-26"
            onClick={() => setSelectedFeature("Grammerchecker")}
          >
            Grammarchecker
          </button>
          {loading && selectedFeature === "Grammerchecker" ? (
            <p className="mt-3 text-lg font-bold text-black">Checking...</p>
          ) : grammarCheckResult ? (
            <p className="mt-3 text-lg font-bold text-black">
              {grammarCheckResult}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Write;
