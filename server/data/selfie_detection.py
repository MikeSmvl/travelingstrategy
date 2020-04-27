import urllib.request
from matplotlib import pyplot
from matplotlib.patches import Rectangle
# the algortihm we'll be using for face detection, called "Multi-Task Convoluted Neural Networks"
from mtcnn.mtcnn import MTCNN
import os
from pathlib import Path


# Function to get the last file saved in discarded folder
def get_last_discarded():
    path = 'images_to_filter/discarded'
    filenames = []
    for file in os.listdir(path):
        if file.endswith(".jpg"):
            filenames.append(int(Path(file).stem))
    return (sorted(filenames)[-1] + 1)


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
def check_if_selfie(image_path):
    # get all the faces in the image
    faces = search_for_faces(image_path)
    # reads the image
    image = pyplot.imread(image_path)
    # plots the image with pyplot
    pyplot.imshow(image)
    # use pyplot's gca method for the axis system
    img_with_axes = pyplot.gca()
    # get dimensions of original image
    og_height, og_width, rgb = image.shape
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
            return True
    return False


def check_if_group_photo(image_path):
    image = pyplot.imread(image_path)
    pyplot.imshow(image)
    faces = search_for_faces(image_path)
    number_of_faces = len(search_for_faces(image_path))
    total_width = 0
    og_height, og_width, rgb = image.shape
    for face in faces:
        face_width = face['box'][2]
        total_width += face_width
    # if there are more than 5 people or if their faces cover half of the picture, then it is a group photo
    if number_of_faces > 4 or total_width/og_width > 0.4:
        return True
    return False


#save_img_url('https://i.pinimg.com/originals/cf/70/ce/cf70ce32f1981d64ed82875772e33dfa.jpg', 'images_to_filter/test1.jpg')
#faces = search_for_faces('images_to_filter/test1.jpg')
#print(check_if_selfie('images_to_filter/test3.jpg', faces))
# print(check_if_group_photo('images_to_filter/test1.jpg'))
