from PIL import Image,ImageDraw
import miner as m
from math import *

def mark(path,jpg,page):
    paper = m.parse(path)
    paper.changeWidthTo(700)
    p = Image.open(jpg)
    p = p.convert("RGB")
    p = p.resize((round(paper.width),round(paper.height)),Image.ANTIALIAS)
    draw = ImageDraw.Draw(p)
    num = 0
    for box in paper.body[page]:
        for line in box:
            for word in line:
                num += 1
                draw.rectangle(word["start"]+word["end"],outline='red')
                draw.text(word["start"],str(num),fill='red')
    p.show()

if __name__ == '__main__':
    mark('./test.pdf','page-0.jpeg',0)
