# Module 3: Legal NER & Citation Parsing
import re
from typing import Dict, List

class LegalExtractor:
    """
    Extracts statutes, sections, and citations from paragraph text.
    Zero-hallucination deterministic regex extraction.
    """
    def __init__(self):
        # e.g., "Section 345 of the Code of Criminal Procedure, 1898"
        self.statute_pattern = re.compile(r'(Section|Sec\.?)\s*(\d+[A-Z]*)\s*(?:of\s*)?the\s*([A-Z][a-zA-Z\s]+Act),?\s*(\d{4})')
        # e.g., "1 BLC 123" or "15 MLR 202"
        self.citation_pattern = re.compile(r'(\d+)\s+(BLC|BLD|MLR|DCD)\s+(\d+)')

    def extract_entities(self, text: str) -> Dict:
        statutes = self.statute_pattern.findall(text)
        citations = self.citation_pattern.findall(text)
        
        return {
            "statutes": [
                {"section": s[1], "act": s[2].strip(), "year": s[3]} for s in statutes
            ],
            "citations": [
                {"volume": c[0], "reporter": c[1], "page": c[2]} for c in citations
            ]
        }
