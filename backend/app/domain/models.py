import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text, Float, JSON, Enum as SQLEnum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from pgvector.sqlalchemy import Vector

class Base(DeclarativeBase):
    pass

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    s3_key: Mapped[str] = mapped_column(String(512), unique=True)
    status: Mapped[str] = mapped_column(String(50), default="PENDING")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    cases: Mapped[List["Case"]] = relationship(back_populates="document")

class Case(Base):
    __tablename__ = "cases"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    document_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documents.id"))
    title: Mapped[str] = mapped_column(String(512), index=True)
    citation: Mapped[str] = mapped_column(String(255), index=True)
    year: Mapped[int] = mapped_column(Integer)
    court: Mapped[str] = mapped_column(String(255))
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict)
    document: Mapped["Document"] = relationship(back_populates="cases")
    paragraphs: Mapped[List["Paragraph"]] = relationship(back_populates="case", cascade="all, delete-orphan")

class Paragraph(Base):
    __tablename__ = "paragraphs"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    case_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("cases.id"), index=True)
    text: Mapped[str] = mapped_column(Text)
    para_type: Mapped[Optional[str]] = mapped_column(String(50))
    embedding: Mapped[Optional[List[float]]] = mapped_column(Vector(384))
    case: Mapped["Case"] = relationship(back_populates="paragraphs")
