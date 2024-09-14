import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

// Dictionary of gendered terms and their neutral alternatives
const genderedTerms = {
  'chairman': 'chairperson',
  'mankind': 'humankind',
  'fireman': 'firefighter',
  'policeman': 'police officer',
  'stewardess': 'flight attendant',
  'mailman': 'mail carrier',
  'businessman': 'business person',
  'salesman': 'salesperson',
  'manpower': 'workforce',
  'man-made': 'artificial',
  'congressmen': 'members of congress',
  'freshman': 'first-year student',
  'housewife': 'homemaker',
  'lady doctor': 'doctor',
  'male nurse': 'nurse',
  'poetess': 'poet',
  'actresses': 'actors',
  'headmaster': 'principal',
  'landlord': 'property owner',
  'mankind': 'humanity',
};

const EqualSpeak = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState({ score: 0, biasedTerms: [], explanation: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await use.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (model && inputText) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => analyzeText(inputText), 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [inputText, model]);

  const analyzeText = async (text) => {
    setIsAnalyzing(true);
    try {
      const embeddings = await model.embed(text);
      const semanticBiasScore = await detectSemanticBias(embeddings);
      const { biasedTerms, termBiasScore } = detectGenderedTerms(text);
      const combinedScore = (semanticBiasScore + termBiasScore) / 2;
      const explanation = generateExplanation(combinedScore, biasedTerms);
      setAnalysis({ score: combinedScore, biasedTerms, explanation });
    } catch (error) {
      console.error('Error analyzing text:', error);
      setAnalysis({ score: 0, biasedTerms: [], explanation: 'Error occurred during analysis.' });
    }
    setIsAnalyzing(false);
  };

  const detectSemanticBias = async (embeddings) => {
    // This is a placeholder for more sophisticated semantic bias detection
    // In a real scenario, you'd use a fine-tuned model for this specific task
    const embeddingArray = await embeddings.array();
    const sum = embeddingArray[0].reduce((a, b) => a + b, 0);
    return Math.abs(sum) / embeddingArray[0].length; // Normalized sum as a simple bias score
  };

  const detectGenderedTerms = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    const biasedTerms = [];
    let termBiasScore = 0;

    words.forEach((word, index) => {
      if (genderedTerms[word]) {
        biasedTerms.push({
          original: word,
          suggestion: genderedTerms[word],
          index: index
        });
        termBiasScore += 1;
      }
    });

    termBiasScore = Math.min(termBiasScore / words.length, 1);
    return { biasedTerms, termBiasScore };
  };

  const generateExplanation = (score, biasedTerms) => {
    let explanation = '';
    if (score < 0.3) {
      explanation = "The text appears to be relatively gender-neutral.";
    } else if (score < 0.6) {
      explanation = "There may be some gender bias present in the text.";
    } else {
      explanation = "The text contains significant gender bias and should be revised.";
    }

    if (biasedTerms.length > 0) {
      explanation += " Specific gendered terms were detected.";
    }

    return explanation;
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const applySuggestion = (suggestion) => {
    const words = inputText.split(/\s+/);
    words[suggestion.index] = suggestion.suggestion;
    setInputText(words.join(' '));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">EqualSpeak: AI-Powered Gender Bias Detector</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows="5"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here..."
      />
      {isAnalyzing ? (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analyzing...</AlertTitle>
          <AlertDescription>
            Our AI model is analyzing your text for gender bias.
          </AlertDescription>
        </Alert>
      ) : analysis.score > 0 && (
        <Alert variant={analysis.score < 0.3 ? "default" : "destructive"} className="mt-4">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Analysis Complete</AlertTitle>
          <AlertDescription>
            Bias Score: {analysis.score.toFixed(2)}
            <br />
            {analysis.explanation}
          </AlertDescription>
        </Alert>
      )}
      {analysis.biasedTerms.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Suggested Replacements:</h2>
          <ul>
            {analysis.biasedTerms.map((term, index) => (
              <li key={index} className="mb-2">
                Replace "{term.original}" with "{term.suggestion}"
                <button
                  onClick={() => applySuggestion(term)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EqualSpeak;