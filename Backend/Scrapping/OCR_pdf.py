from pdfminer.high_level import extract_text

class ScannedPDF:
    
    def __init__(self) -> None:
        self.resume = ''
    
    def OCR_pdf(self,resume):
        '''
        Param
        resume: Provide the Resume on which you want to perform OCR
        '''
        text = extract_text(resume)
        
        return text

if __name__ == '__main__':
    scanner = ScannedPDF()
    resume_desc = scanner.OCR_pdf('D:\MLH\Backend\Resume\Resume1.pdf')
    
    with open('D:\MLH\Backend\Resume\Resume1_description.txt','w') as file:
        file.write(resume_desc)
        
    print(resume_desc)