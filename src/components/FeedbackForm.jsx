import React, { useState } from "react";
import { QUESTIONS, SUBJECTS_AND_LABS, RATINGS } from "../constants/form-data";
import RatingIcon from './RatingIcon'; // <-- Import the new component

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

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    ...initializeTableState(),
    suggestions: ""
  });

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
    <div 
      className="w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 my-8 max-w-7xl mx-auto opacity-0 animate-fade-in-up"
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Syllabus Feedback Form
        </h1>
        <p className="mt-2 text-md text-slate-500">
          Your anonymous feedback is valuable for improving our curriculum.
        </p>
      </div>
      
      <hr className="my-8 border-slate-200" />

      <form onSubmit={handleSubmit}>
        {/* --- Form Table with STICKY COLUMN --- */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-100">
          <table className="min-w-full table-auto text-sm border-collapse">
            <thead className="sticky top-0 z-20">
              <tr className="bg-slate-50">
                {/* STICKY HEADER CELL */}
                <th scope="col" className="sticky left-0 bg-slate-50 w-1/4 min-w-[300px] px-4 py-4 text-left font-semibold text-slate-700 z-10">
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
                 {/* STICKY HEADER CELL (empty) */}
                <th scope="col" className="sticky left-0 bg-slate-100 px-4 py-3 border-t border-slate-200 z-10"></th>
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
                <tr key={`q${qIndex}`} className="border-t border-slate-200">
                  {/* STICKY BODY CELL */}
                  <td className="sticky left-0 bg-white px-4 py-4 text-left font-medium text-slate-800 z-10">
                    {question} <span className="text-red-500">*</span>
                  </td>
                  {SUBJECTS_AND_LABS.map((subject, index) => {
                    const subjectKey = subject.replace(/\s+/g, '_');
                    return RATINGS.map((rating) => (
                      <td key={`${qIndex}-${subjectKey}-${rating}`}
                        className={`p-3 border-l border-slate-200 transition-colors duration-200 hover:bg-indigo-50/50 ${
                          index % 2 !== 0 ? 'bg-slate-50/50' : 'bg-white'
                        }`}
                      >
                        <label className="group flex justify-center items-center cursor-pointer w-full h-full">
                          <input
                            type="radio"
                            name={`${qIndex}-${subjectKey}`}
                            value={rating}
                            checked={feedback[`q${qIndex}`]?.[subjectKey] === rating}
                            onChange={() => handleRatingChange(qIndex, subjectKey, rating)}
                            className="sr-only"
                            required
                          />
                          {/* --- CREATIVE RATING ICON --- */}
                          <RatingIcon
                            rating={rating}
                            isSelected={feedback[`q${qIndex}`]?.[subjectKey] === rating}
                          />
                        </label>
                      </td>
                    ));
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Open-ended Feedback Section --- */}
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