import express, { json } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import cors from "cors";

const port = 5000;
const dirPath = "./upload_directory";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dirPath));
app.use(cors());

const checkForDir = async () => {
  try {
    await fs.access(dirPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dirPath);
    }
  }
};

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    try {
      await checkForDir();
      cb(null, path.join(dirPath));
    } catch (err) {
      cb(err);
    }
  },
  async filename(req, file, cb) {
    let i = file.originalname.lastIndexOf(".");
    let newName = file.originalname.slice(0, i);
    cb(null, newName + "-" + uuid() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
});

const getFileInformation = async (fileName) => {
  const stats = await fs.stat(path.resolve(dirPath, fileName));
  console.log("line 53: ", stats);
  return stats;
};

const readDir = async (req, res) => {
  return await fs.readdir(dirPath);
};

app.get("/photos", async (req, res) => {
  try {
    const data = await readDir();
    console.log("data line 63: ", data);
    let photoObjects = data.map((photo) => ({
      src: `${photo}`,
    }));
    console.log("line 66: ", photoObjects);
    let photoArray = [];
    for (let i = 0; i < photoObjects.length; i++) {
      const { size } = await getFileInformation(data[i]);
      photoArray.push({ ...photoObjects[i], size: size });
    }
    console.log("line 73: ", photoArray);
    res.status(201).json(photoArray);
  } catch (err) {
    res.status(418).json({ message: err });
  }
});

app.get("/photos/:photoId", async (req, res) => {
  try {
    const fileName = req.params.photoId;
    const { size } = await getFileInformation(req.params.photoId);
    console.log("log on line 79: ", size, fileName);
    res.status(200).json({ fileName, size });
  } catch (err) {
    res.status(418).json({ message: "Unable to locate requested information" });
  }
});

app.post("/upload", upload.single("photo"), (req, res) => {
  try {
    console.log("upload line 87, logging req.file: ", req.file);
    res.status(201).sendFile(`${__dirname}/upload_directory/${req.file.filename}`);
  } catch (err) {
    res.status(418).send(err);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Error: page not found");
});

app.listen(port, () => {
  console.log(`Port is now running of localhost ${port}`);
});
