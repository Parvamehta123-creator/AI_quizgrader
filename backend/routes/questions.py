from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Question, QuestionCreate, QuestionRead

router = APIRouter(prefix="/questions", tags=["questions"])

@router.post("/", response_model=QuestionRead)
def create_question(question: QuestionCreate, session: Session = Depends(get_session)):
    db_question = Question.model_validate(question)
    session.add(db_question)
    session.commit()
    session.refresh(db_question)
    return db_question

@router.get("/", response_model=list[QuestionRead])
def list_questions(session: Session = Depends(get_session)):
    questions = session.exec(select(Question)).all()
    return questions

@router.get("/{question_id}", response_model=QuestionRead)
def get_question(question_id: int, session: Session = Depends(get_session)):
    question = session.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question