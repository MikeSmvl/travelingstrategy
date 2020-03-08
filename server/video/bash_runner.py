import subprocess
from os import path
import json

# Get relative path to the server/video folder
base_dir = path.dirname(path.abspath(__file__))
videos = {}

with open('video_links.json') as f:
    videos = json.load(f)

try:
    processes = [subprocess.Popen(["./youtube-gif.sh", "-c", c, "-l", v]) for c, v in videos.items() if c[0]=="C"]
    for p in processes: p.wait()
except Exception as error_msg:
    print(error_msg)
    pass