from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Submission, SubmissionCreate, SubmissionRead, Question
from grader import grade_submission

router = APIRouter(prefix="/submissions", tags=["submissions"])

@router.post("/", response_model=SubmissionRead)
def submit_answer(submission: SubmissionCreate, session: Session = Depends(get_session)):
    question = session.get(Question, submission.question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    if not submission.answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty")
    try:
        result = grade_submission(
            question_description=question.description,
            rubric=question.rubric,
            answer=submission.answer
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Grading failed: {str(e)}")

    db_submission = Submission(
        question_id=submission.question_id,
        student_name=submission.student_name,
        answer=submission.answer,
        score=result["score"],
        feedback=result["feedback"],
        strengths=result["strengths"],
        improvements=result["improvements"]
    )
    session.add(db_submission)
    session.commit()
    session.refresh(db_submission)
    return db_submission

@router.get("/", response_model=list[SubmissionRead])
def list_submissions(session: Session = Depends(get_session)):
    submissions = session.exec(select(Submission)).all()
    return submissions

@router.get("/{submission_id}", response_model=SubmissionRead)
def get_submission(submission_id: int, session: Session = Depends(get_session)):
    submission = session.get(Submission, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission