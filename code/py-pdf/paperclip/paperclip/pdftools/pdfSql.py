#coding: UTF-8
import miner as m
import os
import shutil
import pdf2pic

path = r'./hw-2-4.pdf'
outputfile = r'output.sql'

def sqlString(table,vtype,value):
    res = []
    res.append('INSERT')
    res.append(table)
    res.append('('+','.join(vtype)+')')
    res.append('VALUES')
    vstr = '('
    for item in value:
        if isinstance(item,str):
            vstr+="'"+item+"'"
        else:
            vstr+=str(item)
        vstr+=','
    vstr = vstr[:-1]
    vstr+=');\n'
    res.append(vstr)
    return ' '.join(res)
    

def paper2sql(ot,path,title,paperid,pagestart):
    paper = m.parse(path)
    paper.changeWidthTo(700)
    def ow(table,vtype,value):
        ot.write(sqlString(table,vtype,value))
    paper_type = ['id','author','key_words','page_num','title']
    page_type = ['id','content_url','pagination','paper_id']
    block_type = ['content','end_point','location','start_point','paper_page_id']
    ow('paper',paper_type,[paperid,'unknown author','',len(paper.body),title])
    pagenum = 0
    pageid = pagestart
    for page in paper.body:
        pagenum+=1
        curl = '%s-%d.jpeg' % (str(paperid),pagenum-1)
        ow('paper_page',page_type,[pageid,curl,pagenum,paperid])
        location=0
        for box in page:
            for line in box:
                for word in line:
                    location+=1
                    try:
                        if word["content"].isprintable():
                            ow('block',block_type,[word["content"].replace("'",r"\'"),str(word["end"]),location,str(word["start"]),pageid])
                        else:
                            ow('block',block_type,['',str(word["end"]),location,str(word["start"]),pageid])
                    except:
                        ow('block',block_type,['',str(word["end"]),location,str(word["start"]),pageid])
        pageid += 1
    return pagenum

def pdf2sql(ot,src,pdf_tar,pic_tar,paperid,pageid):
    for file in os.listdir(src):
        shutil.copyfile(src+'/'+file,pdf_tar+'/'+str(paperid)+'.pdf')
        os.mkdir(pic_tar+'/'+str(paperid))
        pdf2pic.pdf2jpeg(pdf_tar+'/'+str(paperid)+'.pdf',pic_tar+'/'+str(paperid)+'/'+str(paperid))
        pagenum = paper2sql(ot,pdf_tar+'/'+str(paperid)+'.pdf',file[:-4],paperid,pageid)
        paperid += 1
        pageid += pagenum
        

def getStart(pic_tar):
    l = os.listdir(pic_tar)
    res = 1
    for file in l:
        num = int(file)
        if num+1>res:
            res = num+1
    return res

if __name__ == '__main__':
    src = './src'
    pdf_tar = './pdf'
    pic_tar = './pic'
    paperid = getStart(pic_tar)
    pageid = 1
    ot = open('./output.sql','w')
    pdf2sql(ot,src,pdf_tar,pic_tar,paperid,pageid)
    ot.close()

##num = 0
##l = os.listdir('./pic')
##for file in l:
##    print(file)
##    shutil.copyfile('./src/'+file,str(num)+'.pdf')
##    num += 1
    
