from cv2 import cv2
from matplotlib import pyplot
import cvlib
from cvlib.object_detection import draw_bbox
from selfie_detection import get_last_discarded


# Function that detects body parts and object and compares their size to an acceptable threshold
def check_for_objects(image_path):
    # load image with OpenCV
    image = cv2.imread(image_path)
    # get dimensions of original image
    og_height, og_width, rgb = image.shape
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
        # calculate area to see if the objects occupy at least 50% of the image
        if (total_widths * total_heights)/(og_width * og_height) > 0.5:
            # add rectangles around the objects to the image with the axes, readjust rgb color back to original since OpenCV reads image colors differently
            output_image = cv2.cvtColor(
                draw_bbox(image, coordinates, item, confidence), cv2.COLOR_BGR2RGB)
            pyplot.imshow(output_image)
            pyplot.savefig(
                f'images_to_filter/discarded/{get_last_discarded()}.jpg')
            return True
    return False


#check_for_objects('images_to_filter/test7.png')
