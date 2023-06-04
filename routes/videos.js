const router = require("express").Router();
const fs = require("fs");
const crypto = require("crypto");

const filepath = "./data/videos.json";

function getVideos() {
  const videosJson = fs.readFileSync(filepath);
  return JSON.parse(videosJson);
}

function setVideos(videos) {
  fs.writeFileSync(filepath, JSON.stringify(videos, null, 2));
}

// Getting all the videos from the JSON file
router.get("/", (req, res) => {
  const videos = getVideos();
  res.send(videos);
});

// Getting the single video by ID
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
    title: req.body.title,
    channel: req.body.channel,
    image: "http://localhost:8080/images/image8.jpeg",
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "1:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().toISOString(),
    comments: [],
  };

  videos.push(newVideo);
  setVideos(videos);

  res.status(201).json(newVideo);
});

module.exports = router;