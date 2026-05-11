import { useState } from "react";
import { api } from "../api";

export default function CreateQuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rubric, setRubric] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !rubric.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    setSuccess(false);
    try {
      await api.createQuestion({ title, description, rubric });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setRubric("");
    } catch (e: any) {
      setError(e.message || "Failed to create question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a Question</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Physics Q1"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="What is the question you want students to answer?"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Grading Rubric</label>
        <textarea
          value={rubric}
          onChange={e => setRubric(e.target.value)}
          placeholder="Describe the criteria for a good answer..."
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-3">✓ Question created successfully!</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? "Creating..." : "Create Question"}
      </button>
    </div>
  );
}