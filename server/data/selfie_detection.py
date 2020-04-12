import urllib.request
import PIL
from matplotlib import pyplot
from matplotlib.patches import Rectangle
# the algortihm we'll be using for face detection, called "Multi-Task Convoluted Neural Networks"
from mtcnn.mtcnn import MTCNN


# Function to convert url of instagram picture to a jpg file
def save_img_url(url, file_name):
    with urllib.request.urlopen(url) as resource:
        with open(file_name, 'wb') as file:
            file.write(resource.read())


# Function to identify and return all the faces in a picture
def search_for_faces(image_path):
  # reads the image
    image = pyplot.imread(image_path)
    # initialize the MTCNN algorithm
    algorithm = MTCNN()

    # each face is represented as a list of characteristics that are in the form of 'key': value pairs
    faces = algorithm.detect_faces(image)
    return faces