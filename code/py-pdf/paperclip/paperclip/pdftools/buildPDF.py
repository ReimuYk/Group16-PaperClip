import os
import sys
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import *
from PyPDF2 import PdfFileWriter, PdfFileReader
from PIL import Image,ImageDraw,ImageFont
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
pdfmetrics.registerFont(TTFont('msyh', 'MSYHBD.TTF'))

styleSheet = getSampleStyleSheet()
class PostilBlock:
    def __init__(self,num,content):
        self.setNum(num)
        self.setContent(content)
        self.tableStyle=[
                ('INNERGRID',(0,0),(-1,-1),0.25,colors.black),
                ('ALIGN',(0,0),(0,0),'RIGHT'),
                ('VALIGN',(0,0),(-1,-1),'MIDDLE')
                ]
        self.colWidth=[50,400]
        self.buildTable()
    def setNum(self,num):
        self.num = str(num)
    def setContent(self,content):
        p = Paragraph('<font name="msyh"><b>%s</b></font>'%content,style=styleSheet["BodyText"])
        self.content = p
    def buildTable(self):
        data=[[self.num,self.content]]
        self.body=Table(data,colWidths=self.colWidth,style=self.tableStyle)

#convert a '.jpg' file to '.pdf' with same filename
def conpdf(filename):
    f_jpg = filename+'.jpg'
    f_pdf = filename+'.pdf'
    (h, w) = landscape(A4)
    c = canvas.Canvas(f_pdf, pagesize = (w,h))
    c.drawImage(f_jpg, 0, 0, w, h)
    c.save()
#merge input pdfs into an output pdf
def mergepdf(output,inputs):
    pdf_writer = PdfFileWriter()
    for path in inputs:
        pdf_reader = PdfFileReader(path)
        for page in range(pdf_reader.getNumPages()):
            pdf_writer.addPage(pdf_reader.getPage(page))
    out_file = open(output,'wb')
    pdf_writer.write(out_file)
    out_file.close()
#infile pic + postil marks = outfile pic
#postils: a list of postil
#postil: {blocks:[b1,b2,b3],order:123,content:'str'}
#block(bx): {start:[],end:[],content:'str'}
def setMark(infile,outfile,postils):
    in_img = Image.open(infile)
    in_img = in_img.convert("RGB")
    rev_para = in_img.size[0]/700
    draw = ImageDraw.Draw(in_img)
    for postil in postils:
        blocks = postil["blocks"]
        for block in blocks:
            #revise size
            block["start"] = [block["start"][0]*rev_para,block["start"][1]*rev_para]
            block["end"] = [block["end"][0]*rev_para,block["end"][1]*rev_para]
            #draw lines
            start = block["start"]
            end = block["end"]
            draw.line((start[0],end[1],end[0],end[1]),fill='red',width=6)
        for i in range(len(blocks)-1):
            start = blocks[i]["end"]
            end = (blocks[i+1]["start"][0],blocks[i+1]["end"][1])
            if end[0]>start[0]:
                draw.line((start[0],start[1],end[0],end[1]),fill='red',width=6)
        numloc = blocks[-1]["end"]
        numloc = (numloc[0]+10,numloc[1]-10)
        ft=ImageFont.truetype("MSYHBD.TTC", 30)
        draw.text(numloc,str(postil["order"]),fill='red',font=ft)
    in_img.save(outfile)
def setPostil(outfile,postils):
    story = []
    for postil in postils:
        t = PostilBlock(postil["order"],postil["content"]).body
        story.append(CondPageBreak(inch))
        story.append(t)
        story.append(Spacer(8*inch,15))
    (h, w) = landscape(A4)
    doc=SimpleDocTemplate(outfile,pagesize=(w,h))
    doc.build(story)
if __name__=='__main__':
    b1 = {"start":[300,300],"end":[500,500]}
    b2 = {"start":[700,300],"end":[900,500]}
    b3 = {"start":[100,700],"end":[300,900]}
    p = {"blocks":[b1,b2,b3],"order":1,"content":"这是 a first order block"}
    pos = [p]
    setPostil('aaa.pdf',pos)

