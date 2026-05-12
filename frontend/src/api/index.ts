export interface Question {
  id: number;
  title: string;
  description: string;
  rubric: string;
  created_at: string;
}

export interface Submission {
  id: number;
  question_id: number;
  student_name: string;
  answer: string;
  score: number | null;
  feedback: string | null;
  strengths: string | null;
  improvements: string | null;
  created_at: string;
}

export interface SubmitAnswerPayload {
  question_id: number;
  student_name: string;
  answer: string;
}

export interface CreateQuestionPayload {
  title: string;
  description: string;
  rubric: string;
}

const BASE = import.meta.env.VITE_API_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "Request failed");
  }
  return res.json();
}

export const api = {
  getQuestions: (): Promise<Question[]> =>
    fetch(`${BASE}/questions/`).then(r => handleResponse(r)),

  getQuestion: (id: number): Promise<Question> =>
    fetch(`${BASE}/questions/${id}`).then(r => handleResponse(r)),

  createQuestion: (data: CreateQuestionPayload): Promise<Question> =>
    fetch(`${BASE}/questions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => handleResponse(r)),

  getSubmissions: (): Promise<Submission[]> =>
    fetch(`${BASE}/submissions/`).then(r => handleResponse(r)),

  submitAnswer: (data: SubmitAnswerPayload): Promise<Submission> =>
    fetch(`${BASE}/submissions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(r => handleResponse(r)),
};