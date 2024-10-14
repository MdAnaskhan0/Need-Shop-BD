require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// API creation
app.get('/', (req, res) => {
    res.send("Express App is running");
});

// Image storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './upload/images';
        // Ensure the directory exists
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});

// Static files middleware
app.use('/images', express.static(path.join(__dirname, 'upload', 'images')));

// Create upload endpoint for images
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded!' });
    }

    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Global error handler for multer errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: 0, message: err.message });
    } else if (err) {
        return res.status(400).json({ success: 0, message: err.message });
    }
    next();
});

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port: ${port}`);
    } else {
        console.error("Error starting server:", error);
    }
});
