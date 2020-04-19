from cv2 import cv2
import matplotlib.pyplot as plt
import cvlib as cv
from cvlib.object_detection import draw_bbox
im = cv2.imread('images_to_filter/test8.png')
bbox, label, conf = cv.detect_common_objects(im)
left_bottom, left_top, right_top, right_bottom  = bbox[0]
output_image = draw_bbox(im, bbox, label, conf)
plt.imshow(output_image)
plt.show()