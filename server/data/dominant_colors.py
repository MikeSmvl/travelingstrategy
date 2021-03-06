# using KMeans clustering algorithm for extracting colors
from sklearn.cluster import KMeans
from matplotlib import pyplot
import numpy as np
from cv2 import cv2
from collections import Counter
from colormath.color_objects import sRGBColor, LabColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie2000
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
    return rgb_colors, sorted(counts.values(), reverse = True)


# Function that identifies the more similar colors and decides if they are occupying an acceptable amount in the image
def find_nearest_colors(image_path):
    # save rgb colors and their value on the pie chart on 240,000
    rgb_colors_list, values = get_dominant_colors(image_path, 3, False)
    color_1, color_2, color_3 = rgb_colors_list
    # since delta e cie2000 uses Lab color space, we convert from RGB to Lab color space
    lab_1 = convert_color(sRGBColor(color_1[0], color_1[1], color_1[2]), LabColor)
    lab_2 = convert_color(sRGBColor(color_2[0], color_2[1], color_2[2]), LabColor)
    lab_3 = convert_color(sRGBColor(color_3[0], color_3[1], color_3[2]), LabColor)
    # do some checks on the size of the fraction 2 colors out of 3 occupy and their delta e cie2000 metric
    # if they occupy more than 59% of the pie chart, it means they occupy that much of the picture as well
    # if their delta e cie2000 value is below 23, it strongly indicates that the 2 colors are very similar to eachother
    if values[0]+values[1]/240000 >= 0.59:
      if delta_e_cie2000(lab_1, lab_2) < 23:
        return True
    if values[0]+values[2]/240000 >= 0.59:
      if delta_e_cie2000(lab_1, lab_3) < 23:
        return True
    if values[1]+values[2]/240000 >= 0.59:
      if delta_e_cie2000(lab_2, lab_3) < 23:
        return True
    return False
