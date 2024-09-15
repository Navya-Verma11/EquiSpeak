import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { getGroqChatCompletion } from './API/analyze';

const EqualSpeak = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputText) {
        analyzeText(inputText);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [inputText]);

  const analyzeText = async (text) => {
    setIsLoading(true);
    try {

      let res = await getGroqChatCompletion(text);
      console.log(res["choices"][0]["message"].split("\n")[-1]);

    } catch (error) {
      console.error('Error analyzing text:', error);
      setAnalysis({ error: 'Failed to analyze text. Please try again.' });
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const applySuggestion = (original, suggestion) => {
    setInputText(inputText.replace(original, suggestion));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">EqualSpeak: AI-Powered Gender Bias Detector</h1>
      <textarea
        className="w-full p-2 border rounded bg-transparent mb-4"
        rows="5"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here..."
      />
      {isLoading && <p>Analyzing text...</p>}
      {analysis && !analysis.error && (
        <div className="mt-4">
          <Alert>
            <AlertTitle>{analysis.biasDetected ? 'Gender-Biased Terms Detected' : 'No Gender Bias Detected'}</AlertTitle>
            <AlertDescription>
              {analysis.biasDetected 
                ? "We've identified potentially gender-biased terms in your text. See suggestions below."
                : "Great job! Your text appears to use gender-neutral language."}
            </AlertDescription>
          </Alert>
          {analysis.biasDetected && (
            <>
              <h2 className="text-lg font-semibold mt-4 mb-2">Suggested Replacements:</h2>
              <ul>
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="mb-2">
                    Replace "{suggestion.original}" with "{suggestion.replacement}"
                    <button
                      onClick={() => applySuggestion(suggestion.original, suggestion.replacement)}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Apply
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      {analysis && analysis.error && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{analysis.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EqualSpeak;