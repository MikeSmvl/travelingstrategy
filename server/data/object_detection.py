from cv2 import cv2
import PIL
from matplotlib import pyplot
import cvlib
from cvlib.object_detection import draw_bbox
from selfie_detection import get_last_discarded


# Function that detects body parts and object and compares their size to an acceptable threshold
def check_for_objects(image_path):
    # load image with OpenCV
    image = cv2.imread(image_path)
    total_widths = 0
    total_heights = 0
    # with computer vision, identify objects and return the bounding box co-ordinates, corrensponding labels and confidence scores
    coordinates, item, confidence = cvlib.detect_common_objects(image)
    if coordinates[0]:
        # save coordinates of object
        for coordinate in coordinates:
            # unpacking coordinates of each object found
            x1, y1, x2, y2 = coordinate
            total_widths += (x2 - x1)
            total_heights += (y2 - y1)
            # get dimensions of original image
        og_width, og_height = PIL.Image.open(image_path).size
        # calculate area to see if the objects occupy at least 50% of the image
        if (total_widths * total_heights)/(og_width * og_height) > 0.5:
            # add rectangles around the objects to the image with the axes
            output_image = draw_bbox(image, coordinates, item, confidence)
            pyplot.imshow(output_image)
            pyplot.savefig(
                f'images_to_filter/discarded/{get_last_discarded()}.jpg')
            return True
    return False


check_for_objects('images_to_filter/test4.jpg')
