require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { type } = require('os');

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
    console.log('File:', req.file); 
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



// Schema for creating a product
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    }
});

// Create Product model
const Product = mongoose.model('Product', ProductSchema);

// Endpoint to add a product
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;
        const newProduct = new Product({
            name,
            image,
            category,
            new_price,
            old_price,
        });

        await newProduct.save();
        console.log("Product saved:", newProduct);

        // Respond with the saved product name
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: {
                id: newProduct._id, 
                name: newProduct.name,
            },
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
            error: error.message,
        });
    }
});

// Endpoint to remove a product by ID
app.post('/removeproduct', async (req, res) => {
    try {
        const { id } = req.body; 
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required."
            });
        }
        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        console.log("Removed:", deletedProduct);
        res.json({
            success: true,
            message: "Product removed successfully.",
            product: {
                id: deletedProduct._id,
                name: deletedProduct.name,
            }
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove product.",
            error: error.message,
        });
    }
});



// creating api for get allproduct
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});

        console.log("All products fetched");

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products: products, 
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve products",
            error: error.message,
        });
    }
});

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port: ${port}`);
    } else {
        console.error("Error starting server:", error);
    }
});
