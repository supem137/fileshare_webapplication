import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config';

const { Schema, model } = mongoose;

const app = express();
app.use(cors());
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const fileDatasSchema = new Schema({ path: String, password: String });
const FileData = model('filedatas', fileDatasSchema);

app.get('/download/:id', async (req, res) => {
  const data = await FileData.findById(req.params.id);
  console.log(req.url);
  res.download(data.path);
});

app.get('/password/:id', async (req, res) => {
  const data = await FileData.findById(req.params.id);
  console.log(req.url);

  if (req.query.password === data.password) {
    res.download(data.path);
    console.log('hi down');
  } else {
    res.send('hi');
  }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const data = await FileData.create({
      path: req.file.path,
      password: req.body.password,
    });

    console.log(data);

    if (!data.password) {
      res
        .status(200)
        .json({ url: `http://localhost:3000/download/${data._id}` });
    } else {
      res
        .status(200)
        .json({ url: `http://localhost:5173/download/password/${data._id}` });
    }
  } catch (error) {
    res.status(500).json({ serverError: 'Internal Server Error' });
  }
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`server started by ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
