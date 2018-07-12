# coding:UTF-8
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from paperclip.pdftools import miner
import base64

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
