const router = require("express").Router();
const fs = require("fs");
const crypto = require("crypto");

const filepath = "./data/videos.json";
const videosJson = fs.readFileSync(filepath);
const videos = JSON.parse(videosJson);

// Getting all the videos from the JSON file
router.get("/", (req, res) => {
  res.send(videos);
});

// Gettin the single video ID
router.get("/:id", (req, res) => {
  const video = videos.find((video) => video.id === req.params.id);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

function setVideos(videos) {
  fs.writeFileSync(filepath, JSON.stringify(videos, null, 2));
}

// Creating a new video
router.post("/", (req, res) => {
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.body.title,
    channel: req.body.channel,
    image: "https://i.imgur.com/MMDMgD7.jpg",
  };
  videos.push(newVideo);
  setVideos(videos);

  res.status(201).json(newVideo);
});

module.exports = router;

//-------------------------------------------------------------//

// // Update an existing video
// router.put("/videos/:id", (req, res) => {
//     const videos = getVideos();
//     const videoIndex = videos.findIndex((video) => video.id === req.params.id);

//     if (videoIndex !== -1) {
//       const updatedVideo = {
//         id: req.params.id,
//       };

//       videos[videoIndex] = updatedVideo;

//       setVideos(videos);

//       res.json(updatedVideo);
//     } else {
//       res.status(404).json({ message: "Video not found" });
//     }
//   });

// // Delete a video
// router.delete("/videos/:id", (req, res) => {
//   const videos = getVideos();
//   const videoIndex = videos.findIndex((video) => video.id === req.params.id);

//   if (videoIndex !== -1) {
//     const deletedVideo = videos.splice(videoIndex, 1)[0];

//     setVideos(videos);

//     res.json(deletedVideo);
//   } else {
//     res.status(404).json({ message: "Video not found" });
//   }
// });
