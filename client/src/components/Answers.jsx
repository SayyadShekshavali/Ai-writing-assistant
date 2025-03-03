import React, { useEffect, useState } from "react";

function Answers({ selectedFeature, setSelectedFeature, sentence }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!sentence) {
      setError("Please enter a sentence to rephrase.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:9025/api/analys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (data?.rephrased) {
        const matches = data.rephrased.match(/\d+\.\s.+/g);

        if (matches) {
          const uniqueSentences = [...new Set(matches)];
          setAnswer(uniqueSentences.join("\n"));
        } else {
          setAnswer(data.rephrased.trim());
        }
      } else {
        setError(`Unexpected response format: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFeature === "analys") {
      handleSubmit();
    }
  }, [selectedFeature]);
  return (
    <div className="h-130 w-75 border-t-3 border-black   m-1  p-4 shadow-2xl shadow-gray-500 rounded-xl mt-1">
      <p>
        <strong>Selected Option:</strong> {selectedFeature}
      </p>
      <button
        onClick={() => setSelectedFeature("analys")}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
        disabled={loading}
      >
        {loading ? "Rephrasing..." : "Rephrase "}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {answer && (
        <div className="mt-4 p-2 bg-gray-100 border rounded-md">
          <p>
            <strong>Rephrased Sentence:</strong>
          </p>

          {answer.split("\n").map((line, index) => (
            <p key={index} className="text-gray-700">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Answers;
