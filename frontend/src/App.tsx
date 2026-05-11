import { useState } from "react";
import StudentPage from "./pages/StudentPage";
import DashboardPage from "./pages/DashboardPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";

type Page = "student" | "dashboard" | "create";

export default function App() {
  const [page, setPage] = useState<Page>("student");

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-6">
          <span className="font-bold text-blue-600 text-lg">🎓 AI Quiz Grader</span>
          <button
            onClick={() => setPage("student")}
            className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
              page === "student" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Submit Answer
          </button>
          <button
            onClick={() => setPage("create")}
            className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
              page === "create" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Create Question
          </button>
          <button
            onClick={() => setPage("dashboard")}
            className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
              page === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Instructor Dashboard
          </button>
        </div>
      </nav>
      <main className="py-8">
        {page === "student" && <StudentPage />}
        {page === "create" && <CreateQuestionPage />}
        {page === "dashboard" && <DashboardPage />}
      </main>
    </div>
  );
}
