import sys
import importlib
import re
importlib.reload(sys)

from pdfminer.pdfparser import PDFParser,PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import PDFPageAggregator
from pdfminer.layout import LTTextBoxHorizontal,LAParams,LTAnon
from pdfminer.pdfinterp import PDFTextExtractionNotAllowed

class pdf:
    def __init__(self):
        self.body = []
    def setSize(self,size):
        self.width = size[2]
        self.height = size[3]
    def newPage(self):
        self.body.append([])
    def newBox(self):
        self.body[-1].append([])
    def newLine(self):
        self.body[-1][-1].append([])
    def transLocation(self,bbox):
        return (bbox[0],self.height-bbox[3],bbox[2],self.height-bbox[1])
    def newWord(self,bbox,content):
        startp = (bbox[0],bbox[1])
        endp = (bbox[2],bbox[3])
        self.body[-1][-1][-1].append({"start":startp,"end":endp,"content":content})
    def divideWord(self,ltline):
        content = ''
        start = None
        end = None
        for c in ltline:
            con = c.get_text()
            if (isinstance(c,LTAnon) or con==' ') and content!='':
                bbox = (start[0],start[1],end[0],end[1])
                bbox = self.transLocation(bbox)
                self.newWord(bbox,content)
                content = ''
                start = None
                end = None
            elif not (isinstance(c,LTAnon) or con==' '):
                bbox = c.bbox
                if start==None:
                    start = (bbox[0],bbox[1])
                end = (bbox[2],bbox[3])
                content = content+con
        if content!='':
            bbox = (start[0],start[1],end[0],end[1])
            bbox = self.transLocation(bbox)
            self.newWord(bbox,content)
    def changeWidthTo(self,new_width):
        fac = new_width/self.width
        self.width = new_width
        self.height = round(fac*self.height)
        for page in self.body:
            for box in page:
                for line in box:
                    for word in line:
                        word["start"] = (round(word["start"][0]*fac),round(word["start"][1]*fac))
                        word["end"] = (round(word["end"][0]*fac),round(word["end"][1]*fac))
    def printTree(self):
        pn = 0
        for page in self.body:
            pn+=1
            print("page:",pn)
            for box in page:
                print("\tbox:")
                for line in box:
                    print("\t\tline:")
                    for word in line:
                        print("\t\t\tword:\t"+str(word))
            

def getPageSize(page):
    pageinfo = str(page)
    for i in range(len(pageinfo)-len('MediaBox=')):
        if pageinfo[i:i+9]=='MediaBox=':
            res = ''
            for k in range(i+len('MediaBox='),len(pageinfo)):
                if pageinfo[k]=='>':
                    return eval(res)
                res = res+pageinfo[k]
    return ''

'''
 解析pdf 文本，保存到txt文件中
'''
##path = r'./hw-2-4.pdf'
def parse(path):
    fp = open(path, 'rb') # 以二进制读模式打开
    #用文件对象来创建一个pdf文档分析器
    praser = PDFParser(fp)
    # 创建一个PDF文档
    doc = PDFDocument()
    # 连接分析器 与文档对象
    praser.set_document(doc)
    doc.set_parser(praser)

    # 提供初始化密码
    # 如果没有密码 就创建一个空的字符串
    doc.initialize()

    # 检测文档是否提供txt转换，不提供就忽略
    if not doc.is_extractable:
        raise PDFTextExtractionNotAllowed
    else:
        # 创建PDf 资源管理器 来管理共享资源
        rsrcmgr = PDFResourceManager()
        # 创建一个PDF设备对象
        laparams = LAParams()
        device = PDFPageAggregator(rsrcmgr, laparams=laparams)
        # 创建一个PDF解释器对象
        interpreter = PDFPageInterpreter(rsrcmgr, device)

        paper = pdf()
        # 循环遍历列表，每次处理一个page的内容
        for page in doc.get_pages(): # doc.get_pages() 获取page列表
            print(page)
            paper.newPage()
            size = getPageSize(page)
            paper.setSize(size)
            interpreter.process_page(page)
            # 接受该页面的LTPage对象
            layout = device.get_result()
            # 这里layout是一个LTPage对象 里面存放着 这个page解析出的各种对象 一般包括LTTextBox, LTFigure, LTImage, LTTextBoxHorizontal 等等 想要获取文本就获得对象的text属性，
            for x in layout:
##                print(x)
                if (isinstance(x,LTTextBoxHorizontal)):
                    paper.newBox()
                    for l in x:
                        paper.newLine()
                        paper.divideWord(l)
##                        print(l)
##                        print(l.bbox)
##                        print("content:"+l.get_text())
##                        for c in l:
##                            print(c,end='\n')
##                        print()
##                        return
##                if (isinstance(x, LTTextBoxHorizontal)):
##                    with open(r'1.txt', 'a') as f:
##                        results = x.get_text()
##                        print(results)
##                        f.write(results + '\n')
        return paper

if __name__ == '__main__':
    paper = parse(r'./out.pdf')
    paper.printTree()
