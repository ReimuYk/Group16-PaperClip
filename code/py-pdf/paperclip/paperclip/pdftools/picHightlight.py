from PIL import Image
import time

a = Image.open("page.jpg")
a.convert('RGB')

s = a.size
w = s[0]/2
h = s[1]/6

bw=10
bh=20

stime = time.time()

new = Image.new("L",s,255)
pic = []
for i in range(s[0]):
    pic.append([])
    for j in range(s[1]):
        pic[-1].append(a.getpixel((i,j)))

for i in range(s[0]):
    buf=[]
    for j in range(s[1]):
        c = pic[i][j]
        if c==255 and j!=s[1]-1:
            buf.append((i,j))
        else:
            if len(buf)>=w:
                for pp in buf:
                    new.putpixel(pp,0)
            buf=[]
for j in range(s[1]):
    buf=[]
    for i in range(s[0]):
        c = pic[i][j]
        if c==255 and i!=s[0]-1:
            buf.append((i,j))
        else:
            if len(buf)>=h:
                for pp in buf:
                    new.putpixel(pp,0)
            else:
                for pp in buf:
                    if new.getpixel(pp)!=0:
                        new.putpixel(pp,128)
            buf=[]
for i in range(s[0]):
    buf = []
    flag = False
    for j in range(s[1]):
        c = new.getpixel((i,j))
        if c==0 and flag==False:
            flag = True
        elif c==0 and flag==True:
            for pp in buf:
                new.putpixel(pp,0)
        elif c==128 and flag==True:
            buf.append((i,j))
        elif c==255:
            buf = []
            flag = False
etime = time.time()
print("cost:",etime-stime)
new.show()
