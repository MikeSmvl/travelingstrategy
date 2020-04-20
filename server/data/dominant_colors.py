# using KMeans clustering algorithm for extracting colors
from sklearn.cluster import KMeans
from matplotlib import pyplot
import numpy as np
from cv2 import cv2
from collections import Counter
from skimage.color import rgb2lab, deltaE_cie76
import os


# Function that converts an RGB color to HEX
def rgb_to_hex(rgb_color):
    return "#{:02x}{:02x}{:02x}".format(int(rgb_color[0]), int(rgb_color[1]), int(rgb_color[2]))


# Function that get dominant colors in RGB and HEX formats, and that forms a pie chart of them
def get_dominant_colors(image_path, number_of_colors, show_chart):
    # read image
    image = cv2.imread(image_path)
    # change image's color space to RGB since by default openCV uses BGR
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    resized_image = cv2.resize(
        image, (600, 400), interpolation=cv2.INTER_AREA)
    # reshape image to 2 dimensional to be used in KMeans algorithm
    reshaped_image = resized_image.reshape(
        resized_image.shape[0]*resized_image.shape[1], 3)
    # KMeans clusters will be the parameter number_of_colors
    clf = KMeans(n_clusters=number_of_colors)
    # fit and predict on the image to extract the prediction
    labels = clf.fit_predict(reshaped_image)
    # get number of labels
    counts = Counter(labels)
    # find colors
    center_colors = clf.cluster_centers_
    # get colors by iterating through the keys
    colors = [center_colors[i] for i in counts.keys()]

    hex_colors = [rgb_to_hex(colors[i]) for i in counts.keys()]
    rgb_colors = [colors[i] for i in counts.keys()]

    if (show_chart):
        pyplot.figure(figsize=(8, 6))
        # display colors as pie chart using hex
        pyplot.pie(counts.values(), labels=hex_colors, colors=hex_colors)
        pyplot.show()
    return rgb_colors


print(get_dominant_colors('images_to_filter/test9.png', 5, True))
