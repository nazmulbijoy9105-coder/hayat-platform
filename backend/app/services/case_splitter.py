# Module 2: Case Boundary Detection & Paragraph Generation
import re
from typing import List, Dict

class CaseBoundaryDetector:
    """
    Production logic to split monolithic OCR JSON into individual Case Objects.
    Looks for Bangladesh Supreme Court reporter patterns.
    """
    def __init__(self):
        # Regex to catch standard citation headers (e.g., "1 BLC 123" or "MLR 2023")
        self.citation_pattern = re.compile(r'^\s*\d+\s+(BLC|BLD|MLR|DCD|SC)\s+\d+\s*$', re.IGNORECASE)
        self.judgment_start_pattern = re.compile(r'^\s*(JUDGMENT|ORDER|JUDGMENT AND ORDER)\s*$', re.IGNORECASE)

    def detect_boundaries(self, ocr_pages: List[Dict]) -> List[Dict]:
        cases = []
        current_case = None
        
        for page in ocr_pages:
            text = page.get('text', '')
            lines = text.split('\n')
            
            for line in lines:
                if self.citation_pattern.match(line) or self.judgment_start_pattern.match(line):
                    if current_case:
                        cases.append(current_case)
                    current_case = {
                        "start_page": page.get('page_num'),
                        "citation": line.strip() if self.citation_pattern.match(line) else "",
                        "raw_text": ""
                    }
            
            if current_case:
                current_case["raw_text"] += text + "\n"
        
        if current_case:
            cases.append(current_case)
        return self._generate_paragraphs(cases)

    def _generate_paragraphs(self, cases: List[Dict]) -> List[Dict]:
        # Split raw text into paragraph objects
        for case in cases:
            paras = [p.strip() for p in case["raw_text"].split('\n\n') if p.strip()]
            case["paragraphs"] = [{"text": p, "page_number": case["start_page"]} for p in paras]
            case.pop("raw_text", None)
        return cases
