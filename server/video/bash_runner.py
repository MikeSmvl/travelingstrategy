import subprocess
import json

# Initialize empty videos dictionary that will be loaded with a json
videos = {}

# Load links gathered by country_video_links.py in the videos dictionary
with open('video_links.json') as f:
    videos = json.load(f)

# For every country and video link pair start a bash script as a subprocess
try:
    processes = [subprocess.Popen(["./youtube-gif.sh", "-c", c, "-l", v]) for c, v in videos.items()]
    # Wait for all processes to end
    for p in processes: p.wait()
except Exception as error_msg:
    print(error_msg)
    pass