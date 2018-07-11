from wand.image import Image

filename = "./hw-2-4.pdf"
def pdf2jpeg(filename):
    with Image(filename=filename,resolution=300) as img:
        print("pages=",len(img.sequence))
        with img.convert('jpeg') as connverted:
            connverted.save(filename='page.jpeg')

pdf2jpeg(filename)
