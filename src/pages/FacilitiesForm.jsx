import React, { useState } from 'react';

// --- Transcribed Content from your Image ---
const FACILITIES_QUESTIONS = [
  // Section: Internet & Connectivity
  { section: "Internet & Connectivity", question: "How do you rate the internet speed and connectivity on campus?" },
  { section: "Internet & Connectivity", question: "How do you rate the availability of Wi-Fi in classrooms and common areas?" },
  // Section: Laboratories
  { section: "Laboratories", question: "Are the laboratories equipped with the necessary tools for your coursework?" },
  { section: "Laboratories", question: "How do you rate the condition and maintenance of lab equipment?" },
  // Section: Classrooms
  { section: "Classrooms", question: "How comfortable and conducive to learning are the classrooms?" },
  { section: "Classrooms", question: "How do you rate the availability of teaching aids like projectors or smart boards?" },
  // Section: Computing Facilities
  { section: "Computing Facilities", question: "How do you rate the availability of computers for academic use?" },
  { section: "Computing Facilities", question: "Are the systems well-maintained and updated regularly?" },
  // Section: Sports Facilities
  { section: "Sports Facilities", question: "How do you rate the availability of sports facilities and playgrounds?" },
  { section: "Sports Facilities", question: "Are the playground and sports equipment well-maintained?" },
  { section: "Sports Facilities", question: "Are the facilities for indoor and outdoor games satisfactory?" },
  { section: "Sports Facilities", question: "How do you rate the maintenance of sports equipment?" },
  // Section: Gymnasium
  { section: "Gymnasium", question: "How do you rate the equipment and maintenance of the gym?" },
  { section: "Gymnasium", question: "Are the gym timings convenient for student use?" },
  // Section: Library
  { section: "Library", question: "How do you rate the library infrastructure (seating, lighting, and environment)?" },
  { section: "Library", question: "Are the operating hours of the library convenient?" },
  { section: "Library", question: "How do you rate the availability of books, e-resources, and journals?" },
  // Section: Canteen
  { section: "Canteen", question: "How do you rate the quality of food provided in the canteen?" },
  { section: "Canteen", question: "Are the seating arrangements in the canteen sufficient?" },
  // Section: Campus Infrastructure
  { section: "Campus Infrastructure", question: "How do you rate the condition of campus roads and walkways?" },
  { section: "Campus Infrastructure", question: "Are the water and electricity supplies reliable?" },
  // Section: Accessibility
  { section: "Accessibility", question: "How accessible are campus facilities for differently-abled students?" },
  { section: "Accessibility", question: "Are ramps, elevators, and restrooms available and functional?" },
  // Section: Medical Services
  { section: "Medical Services", question: "How do you rate the availability of first aid and medical services on campus?" },
  { section: "Medical Services", question: "How accessible are doctors or medical professionals when needed?" },
  // Section: Student Clubs
  { section: "Student Clubs", question: "How do you rate the variety of clubs available for extracurricular activities?" },
  { section: "Student Clubs", question: "Are there sufficient facilities to conduct club activities effectively?" },
  { section: "Student Clubs", question: "How do you rate the support provided by the college for club activities and events?" },
  // Section: Learning Resources
  { section: "Learning Resources", question: "How do you rate the availability of self-learning resources (MOOC, SWAYAM-NPTEL, etc.)?" },
  { section: "Learning Resources", question: "Are these resources effectively promoted and accessible?" },
  // Section: General Services
  { section: "General Services", question: "How do you rate the availability of printing and photocopying services?" },
  { section: "General Services", question: "Are these services affordable and reliable?" },
  { section: "General Services", question: "How do you rate the accessibility of banking facilities, including ATMs, on campus?" },
  { section: "General Services", question: "Are these facilities sufficient to meet your needs?" },
  // Section: Administrative Services
  { section: "Administrative Services", question: "How do you rate the efficiency of processes like fee payment, attendance, and scholarship applications?" },
  { section: "Administrative Services", question: "Are the administrative staff approachable and helpful?" },
  // Section: Restrooms
  { section: "Restrooms", question: "How do you rate the cleanliness and maintenance of restrooms on campus?" },
  { section: "Restrooms", question: "Are there enough restrooms available to meet student needs?" },
];

const RATING_VALUES = [5, 4, 3, 2, 1];

// The final, premium FacilitiesForm component
const FacilitiesForm = () => {
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [ratings, setRatings] = useState({});
  const [suggestions, setSuggestions] = useState("");

  const handleRatingChange = (qIndex, rating) => {
    setRatings(prev => ({ ...prev, [qIndex]: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Facilities Feedback:", { yearOfStudy, ratings, suggestions });
    alert("Facilities Feedback submitted successfully! Check the developer console.");
  };

  const questionsBySection = FACILITIES_QUESTIONS.reduce((acc, item, index) => {
    (acc[item.section] = acc[item.section] || []).push({ ...item, originalIndex: index });
    return acc;
  }, {});

  return (
    <div 
      className="w-full bg-slate-50 rounded-2xl shadow-2xl p-6 sm:p-10 my-8 max-w-4xl mx-auto opacity-0 animate-fade-in-up"
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
          Facilities Feedback Form
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Year of Study Input */}
        <div>
          <label htmlFor="yearOfStudy" className="block text-lg font-semibold text-slate-800 mb-3">
            Year of Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="yearOfStudy"
            name="yearOfStudy"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
            className="w-full max-w-sm p-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
            placeholder="e.g., Third Year"
            required
          />
        </div>

        {/* Dynamically Rendered Sections and Questions */}
        {Object.entries(questionsBySection).map(([section, questions]) => (
          <div key={section} className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-3 mb-8">
              {section}
            </h3>
            <div className="space-y-10">
              {questions.map(({ question, originalIndex }) => (
                <div key={originalIndex}>
                  <p className="font-medium text-slate-800 mb-4">{question} <span className="text-red-500">*</span></p>
                  <div className="flex items-center space-x-8">
                    {RATING_VALUES.map(value => (
                      <div key={value} className="text-center">
                        <label className="flex flex-col items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${originalIndex}`}
                            value={value}
                            checked={ratings[originalIndex] === value}
                            onChange={() => handleRatingChange(originalIndex, value)}
                            className="peer sr-only"
                            required
                          />
                          <div className="w-6 h-6 mb-2 rounded-full border-2 border-slate-300 transition-all duration-300 peer-hover:scale-110 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-checked:ring-2 peer-checked:ring-indigo-300 peer-checked:scale-110"></div>
                          <span className="text-sm font-semibold text-slate-500 peer-checked:text-indigo-800">{value}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Additional Suggestions */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
          <label htmlFor="suggestions" className="block text-lg font-semibold text-slate-800 mb-3">
            Additional Suggestions <span className="text-red-500">*</span>
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            rows="5"
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
            placeholder="Please provide any other feedback or suggestions here..."
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-12 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacilitiesForm;