from PIL import Image,ImageDraw
import miner as m
from math import *

path = r'./hw-2-4.pdf'
paper = m.parse(path)
paper.changeWidthTo(700)

p = Image.open('./page-0.jpeg')
p = p.convert("RGB")
p = p.resize((round(paper.width),round(paper.height)),Image.ANTIALIAS)
draw = ImageDraw.Draw(p)
num = 0
for box in paper.body[0]:
    for line in box:
        for word in line:
            num += 1
            draw.rectangle(word["start"]+word["end"],outline='red')
            draw.text(word["start"],str(num),fill='red')
p.show()
