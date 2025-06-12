import React, { useState } from "react";
import { QUESTIONS, SUBJECTS_AND_LABS, RATINGS } from "../constants/form-data";

// Helper to initialize the table state (no changes needed here)
const initializeTableState = () => {
  const initialState = {};
  QUESTIONS.forEach((_, qIndex) => {
    initialState[`q${qIndex}`] = {};
    SUBJECTS_AND_LABS.forEach((subject) => {
      const subjectKey = subject.replace(/\s+/g, '_');
      initialState[`q${qIndex}`][subjectKey] = null;
    });
  });
  return initialState;
};

// The new, premium-styled FeedbackForm component
const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    ...initializeTableState(),
    suggestions: ""
  });

  // State management logic (no changes needed here)
  const handleRatingChange = (qIndex, subjectKey, rating) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [`q${qIndex}`]: { ...prevFeedback[`q${qIndex}`], [subjectKey]: rating },
    }));
  };

  const handleSuggestionsChange = (e) => {
    setFeedback(prevFeedback => ({ ...prevFeedback, suggestions: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Feedback:", feedback);
    alert("Feedback submitted successfully! Check the developer console for the data object.");
  };

  return (
    // Main container with entry animation, consistent with the dashboard
    <div 
      className="w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 my-8 max-w-7xl mx-auto opacity-0 animate-fade-in-up"
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      
      {/* --- Refined Form Header --- */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Syllabus Feedback Form
        </h1>
        <p className="mt-2 text-md text-slate-500">
          Your anonymous feedback is valuable for improving our curriculum.
        </p>
      </div>
      
      {/* A subtle divider to add structure */}
      <hr className="my-8 border-slate-200" />

      <form onSubmit={handleSubmit}>
        {/* --- Enhanced Form Table --- */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-100">
          <table className="min-w-full table-auto text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50">
                <th scope="col" className="w-1/4 min-w-[280px] px-4 py-4 text-left font-semibold text-slate-700">
                  Question
                </th>
                {SUBJECTS_AND_LABS.map((subject, index) => (
                  <th key={subject} scope="col" colSpan={RATINGS.length}
                    className={`px-4 py-4 font-semibold text-slate-700 border-l border-slate-200 ${
                      index % 2 !== 0 ? 'bg-slate-100' : 'bg-slate-50'
                    }`}
                  >
                    {subject}
                  </th>
                ))}
              </tr>
              <tr className="bg-slate-100">
                <th scope="col" className="px-4 py-3 border-t border-slate-200"></th>
                {SUBJECTS_AND_LABS.map((subject, index) =>
                  RATINGS.map((rating) => (
                    <th key={`${subject}-${rating}`} scope="col"
                      className={`px-2 py-3 font-medium text-slate-500 border-l border-t border-slate-200 ${
                        index % 2 !== 0 ? 'bg-slate-100' : 'bg-slate-50'
                      }`}
                    >
                      {rating}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {QUESTIONS.map((question, qIndex) => (
                <tr key={`q${qIndex}`} className="hover:bg-indigo-50/50 transition-colors duration-200 border-t border-slate-200">
                  <td className="text-left px-4 py-4 font-medium text-slate-800">
                    {question} <span className="text-red-500">*</span>
                  </td>
                  {SUBJECTS_AND_LABS.map((subject, index) => {
                    const subjectKey = subject.replace(/\s+/g, '_');
                    return RATINGS.map((rating) => (
                      <td key={`${qIndex}-${subjectKey}-${rating}`}
                        className={`p-3 border-l border-slate-200 ${
                          index % 2 !== 0 ? 'bg-slate-100/50' : 'bg-white'
                        }`}
                      >
                        <label className="flex justify-center items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`${qIndex}-${subjectKey}`}
                            value={rating}
                            checked={feedback[`q${qIndex}`]?.[subjectKey] === rating}
                            onChange={() => handleRatingChange(qIndex, subjectKey, rating)}
                            className="peer sr-only"
                            required
                          />
                          {/* Premium Custom Radio Button */}
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 transition-all duration-300
                                          hover:scale-110
                                          peer-checked:bg-indigo-600 
                                          peer-checked:border-indigo-600 
                                          peer-checked:ring-2 
                                          peer-checked:ring-indigo-300 
                                          peer-checked:scale-110">
                          </div>
                        </label>
                      </td>
                    ));
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Premium Open-ended Feedback Section --- */}
        <div className="mt-10 sm:mt-12">
          <label htmlFor="suggestions" className="block text-lg font-semibold text-slate-800 mb-3">
            10. Suggestions for Improvement
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            rows="5"
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl shadow-sm 
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                       transition-all duration-300 text-slate-700 placeholder:text-slate-400"
            placeholder="What specific changes or additions would you recommend?"
            value={feedback.suggestions}
            onChange={handleSuggestionsChange}
            required
          ></textarea>
        </div>

        {/* --- Polished Submit Button --- */}
        <div className="text-center mt-10 sm:mt-12">
          <button
            type="submit"
            className="px-12 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg
                       hover:shadow-xl hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       transform transition-all duration-300 ease-in-out"
          >
            Submit My Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;