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


# Main function that determines if photo is a selfie
def check_if_selfie(image_path, faces):
    # reads the image
    image = pyplot.imread(image_path)
    # plots the image with pyplot
    pyplot.imshow(image)
    # use pyplot's gca method for the axis system
    img_with_axes = pyplot.gca()
    # get dimensions of original image
    og_width, og_height = PIL.Image.open('images_to_filter/test2.jpg').size
    # draw a rectangle for each face based on the coordinates and save the photo in Discarded/
    for face in faces:
        # get dimensions of the face
        x, y, face_width, face_height = face['box']
        if face_width/og_width > 0.25 or face_height/og_height > 0.22:
            # outline the face with a rectangle
            face_rectangle = Rectangle((x, y), face_width, face_height,
                                       fill=False, color='purple')
            # add the rectangle to the image with the axes
            img_with_axes.add_patch(face_rectangle)
            pyplot.savefig('images_to_filter/discarded/selfie.jpg')
            return True
    return False


save_img_url('https://instagram.fymy1-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/91884994_131277001783285_8536432134989860630_n.jpg?_nc_ht=instagram.fymy1-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ctzUWQ6BM68AX9i_i8W&oh=c49d5152440d702185d73b572493cb83&oe=5EAB64C7', 'images_to_filter/test2.jpg')
faces = search_for_faces('images_to_filter/test2.jpg')
print(check_if_selfie('images_to_filter/test2.jpg', faces))
