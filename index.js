const express = require("express");
const router = express.Router();
const fs = require("fs");
const app = express();
const crypto = require("crypto");

const filepath = "./data/videos.json";
app.use(express.json());

// Getting all the videos from the JSON file
router.get("/", (req, res) => {
  const videos = getVideos();

  res.json(videos);
});

// Gettin the single video ID
router.get("/:id", (req, res) => {
  const videos = getVideos();

  const video = videos.find((video) => video.id === req.params.id);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// Creating a new video
router.post("/", (req, res) => {
  const videos = getVideos();

  const newVideo = {
    id: crypto.randomUUID(),

    ...req.body,
  };

  videos.push(newVideo);
  setVideos(videos);

  res.status(201).json(newVideo);
});

// Update an existing video
router.put("/:id", (req, res) => {
  const videos = getVideos();
  const videoIndex = videos.findIndex((video) => video.id === req.params.id);

  if (videoIndex !== -1) {
    const updatedVideo = {
      id: req.params.id,

      ...req.body,
    };

    videos[videoIndex] = updatedVideo;

    setVideos(videos);

    res.json(updatedVideo);
  } else {
    res.status(404).json({ message: "Video not found" }pb);
  }
});

// Delete a video
router.delete("/:id", (req, res) => {
  const videos = getVideos();
  const videoIndex = videos.findIndex((video) => video.id === req.params.id);

  if (videoIndex !== -1) {
    const deletedVideo = videos.splice(videoIndex, 1)[0];

    setVideos(videos);

    res.json(deletedVideo);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// Mount the router at the "/videos" path
app.use("/videos", router);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// functions to process the JSON file
function getVideos() {
  const videosJson = fs.readFileSync(filepath);
  return JSON.parse(videosJson);
}

function setVideos(videos) {
  fs.writeFileSync(filepath, JSON.stringify(videos, null, 2));
}
