import { useState, useEffect } from "react";
import { api } from "../api";
import type { Question, Submission } from "../api";

export default function StudentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | "">("");
  const [studentName, setStudentName] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getQuestions().then(setQuestions).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!selectedQuestion || !studentName.trim() || !answer.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const submission = await api.submitAnswer({
        question_id: Number(selectedQuestion),
        student_name: studentName,
        answer,
      });
      setResult(submission);
      setAnswer("");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const question = questions.find(q => q.id === Number(selectedQuestion));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Answer</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select a Question</label>
        <select
          value={selectedQuestion}
          onChange={e => setSelectedQuestion(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a question --</option>
          {questions.map(q => (
            <option key={q.id} value={q.id}>{q.title}</option>
          ))}
        </select>
      </div>
      {question && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-800 mb-1">Question:</p>
          <p className="text-gray-700">{question.description}</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Answer</label>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? "Grading your answer..." : "Submit for Grading"}
      </button>
      {result && (
        <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Your Results</h2>
            <span className="text-2xl font-bold text-green-700">{result.score}/10</span>
          </div>
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-600 mb-1">Feedback</p>
            <p className="text-gray-700">{result.feedback}</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-semibold text-green-700 mb-1">✓ Strengths</p>
            <p className="text-gray-700">{result.strengths}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-orange-600 mb-1">↑ To Improve</p>
            <p className="text-gray-700">{result.improvements}</p>
          </div>
        </div>
      )}
    </div>
  );
}