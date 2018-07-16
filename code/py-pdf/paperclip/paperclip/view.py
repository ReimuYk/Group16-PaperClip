# coding:UTF-8
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from paperclip.pdftools import miner,htmlParse,pdf2pic
import base64
import json
import os

def hello(request):
    resp = [{'errorcode': '100', 'detail': 'Get success'}]
    li = ['l1','l2','l333']
    print("hello")
    return HttpResponse(json.dumps(li), content_type="application/json")

def block(req):
    paper = miner.parse("./paperclip/pdftools/hw-2-4.pdf")
    return HttpResponse(json.dumps(paper.body[0]), content_type="application/json")

def page(req):
    pic = open("./paperclip/pdftools/page.jpeg","rb")
    data = base64.b64encode(pic.read())
    res = "data:image/jpg;base64,"+str(data)
    res = {'data':res}
    return HttpResponse(json.dumps(res), content_type="application/json")

@csrf_exempt
def html2pdf(req):
    postBody = req.read().decode()
    json_data = json.loads(postBody)
    pid = json_data['paperID']
    print('paperid',json_data['paperID'])
    data = json_data['data']
    print('data',json_data['data'])
    # create pdf & jpeg files
    pdf_uri = '../../back-end/paperclipBackend/data/pdf/'+str(pid)+'.pdf'
    htmlParse.run(json_data['data'],pdf_uri)
    os.mkdir('../../back-end/paperclipBackend/data/pic/%d'%pid)
    pdf2pic.pdf2jpeg(pdf_uri,'../../back-end/paperclipBackend/data/pic/%d/%d'%(pid,pid))
    # create response body
    resp = {}
    paper = miner.parse(pdf_uri)
    pagenum = 0
    blocks = []
    for page in paper.body:
        pagenum+=1
        location=0
        for box in page:
            for line in box:
                for word in line:
                    location+=1
                    b = {}
                    if word["content"].isprintable():
                        b["content"] = word["content"]
                    else:
                        b["content"] = ''
                    b["start"] = word["start"]
                    b["end"] = word["end"]
                    b["location"] = location
                    blocks.append(b)
    resp["pagenum"] = pagenum
    resp["blocks"] = blocks
    return HttpResponse(json.dumps(resp), content_type="application/json")
