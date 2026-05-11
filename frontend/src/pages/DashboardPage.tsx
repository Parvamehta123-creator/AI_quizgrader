import { useState, useEffect } from "react";
import { api } from "../api";
import type { Submission, Question } from "../api";

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getSubmissions(), api.getQuestions()])
      .then(([subs, qs]) => {
        setSubmissions(subs);
        setQuestions(qs);
      })
      .finally(() => setLoading(false));
  }, []);

  const getQuestionTitle = (id: number) =>
    questions.find(q => q.id === id)?.title ?? "Unknown";

  const averageScore =
    submissions.length > 0
      ? (submissions.reduce((acc, s) => acc + (s.score ?? 0), 0) / submissions.length).toFixed(1)
      : "—";

  if (loading) return <p className="p-6 text-gray-500">Loading submissions...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Instructor Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Submissions</p>
          <p className="text-3xl font-bold text-blue-600">{submissions.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-3xl font-bold text-green-600">{averageScore}/10</p>
        </div>
      </div>
      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Question</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Feedback</th>
                <th className="px-4 py-3 text-left">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {submissions.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{sub.student_name}</td>
                  <td className="px-4 py-3 text-gray-600">{getQuestionTitle(sub.question_id)}</td>
                  <td className="px-4 py-3 font-bold">
                    <span className={
                      (sub.score ?? 0) >= 7 ? "text-green-600" :
                      (sub.score ?? 0) >= 4 ? "text-yellow-600" : "text-red-600"
                    }>
                      {sub.score ?? "—"}/10
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{sub.feedback}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}