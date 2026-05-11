import json
import os
import urllib.request
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

API_KEY = os.getenv("OPENROUTER_API_KEY")
API_URL = "https://openrouter.ai/api/v1/chat/completions"


def grade_submission(question_description: str, rubric: str, answer: str) -> dict:
    prompt = f"""You are a fair and constructive academic grader.

Question: {question_description}

Grading Rubric: {rubric}

Student Answer: {answer}

Grade the student's answer based strictly on the rubric.
Respond ONLY with a valid JSON object — no preamble, no markdown, no explanation outside the JSON.

Return this exact structure:
{{
  "score": <number from 0 to 10>,
  "feedback": "<2-3 sentence overall feedback>",
  "strengths": "<what the student did well>",
  "improvements": "<specific things they could improve>"
}}"""

    payload = json.dumps({
        "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AI Quiz Grader"
        },
        method="POST"
    )

    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode("utf-8"))

    message = data["choices"][0]["message"]
    content = message.get("content") or message.get("reasoning") or ""
    raw = content.strip()

    if not raw:
        raise ValueError("Empty response from AI model")

    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    result = json.loads(raw)
    assert "score" in result
    assert "feedback" in result
    assert "strengths" in result
    assert "improvements" in result
    return result