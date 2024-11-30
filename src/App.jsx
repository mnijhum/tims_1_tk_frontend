// src/App.jsx
import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const [surveyCode, setSurveyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await axios.post(
        "http://103.209.42.133:5000/submit-survey",
        {
          survey_code: surveyCode,
        }
      );
      console.log(response);
      setResult(
        response.data.Result.success === true
          ? response.data.Result.validation_code
          : "Failed to retrieve the validation code. Please try again."
      );
    } catch (err) {
      console.log(err);
      setError("Failed to retrieve the validation code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
      <div className="bg-white p-6 mt-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Get your discount code in just 1 click 😉
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="surveyCode"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Survey Code
            </label>
            <input
              type="text"
              id="surveyCode"
              value={surveyCode}
              onChange={(e) => setSurveyCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter code here"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {loading && <LoadingSpinner />}

        {!result && loading && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <strong>
              Please wait 2 to 3 minutes. The code will appear here. Thank you
              for your paitience.{"☺️"}
            </strong>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <strong>{result}</strong>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-800">
        <footer className="w-full py-4 bg-gray-800 text-white text-center">
          Made with ❤️ by Mushfikunnabi Nijhum
        </footer>
      </div>
    </div>
  );
};

export default App;
