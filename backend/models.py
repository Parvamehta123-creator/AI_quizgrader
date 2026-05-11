from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class QuestionBase(SQLModel):
    title: str
    description: str
    rubric: str

class Question(QuestionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class QuestionCreate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id: int
    created_at: datetime

class SubmissionBase(SQLModel):
    question_id: int = Field(foreign_key="question.id")
    student_name: str
    answer: str

class Submission(SubmissionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    score: Optional[float] = None
    feedback: Optional[str] = None
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionRead(SubmissionBase):
    id: int
    score: Optional[float]
    feedback: Optional[str]
    strengths: Optional[str]
    improvements: Optional[str]
    created_at: datetime