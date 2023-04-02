import os
from pypdf import PdfReader


PDF_DIR: str = "pdfs/"
file_paths: list[str] = os.listdir(PDF_DIR)

for file_path in file_paths:
    print(file_path)
    pdf_reader: PdfReader = PdfReader(f"{PDF_DIR}{file_path}")
    for page in pdf_reader.pages:
        text: str = page.extract_text()
        print(text + ".")
