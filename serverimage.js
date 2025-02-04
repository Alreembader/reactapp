const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
// const port = 3008;

// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/images', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ message: 'File uploaded successfully.' });
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
