from wand.image import Image

def pdf2jpeg(filename,outputname):
    with Image(filename=filename,resolution=300) as img:
        print("pages=",len(img.sequence))
        with img.convert('jpeg') as connverted:
            connverted.save(filename=outputname+'.jpeg')

if __name__ == '__main__':
    filename = r"./test.pdf"
    pdf2jpeg(filename,'1')
