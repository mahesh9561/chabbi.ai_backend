const blogSchema = require('../models/BlogSchema');
const mongoose = require('mongoose')


exports.addBlog = async (req, res) => {
    const { name, title, content, publish, img, categories, tags, author, views, likes, comments } = req.body;

    const existingBlog = await blogSchema.findOne({ title });

    if (existingBlog) {
        return res.status(400).json({
            success: false,
            message: "A blog with this title already exists. Please choose a different title."
        });
    }

    const blog = new blogSchema({
        name,
        title,
        content,
        publish: publish || false,
        img: img || "https://example.com/default-image.jpg",
        categories: categories || [],
        tags: tags || [],
        author,
        views: views || 0,
        likes: likes || 0,
        comments: comments || []
    });

    try {
        const result = await blog.save();
        res.status(201).json({
            success: true,
            message: "Blog saved successfully",
            data: result
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (title must be unique)
            res.status(400).json({
                success: false,
                message: "A blog with this title already exists",
                error: error.message
            });
        } else {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Failed to save blog",
                error: error.message
            });
        }
    }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, img, categories, tags } = req.body;

    try {
        const updatedBlog = await blogSchema.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(content && { content }),
                ...(img && { img }),
                ...(categories && { categories }),
                ...(tags && { tags })
            },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
            error: error.message
        });
    }
};

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Blog ID"
        });
    }

    try {
        const deletedBlog = await blogSchema.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: deletedBlog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message
        });
    }
};

exports.viewBlog = async (req, res) => {
    try {
        const fetchApi = await blogSchema.find({});
        if (!fetchApi) {
            return res.status(404).json({ message: "Blog not found" });
        }
        console.log(fetchApi);
        return res.status(200).json({ message: "Data fetched", data: fetchApi });
    } catch (error) {
        return res.status(500).json({ message: "Data not fetched", error });
    }
}

exports.viewSingleBlog = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const fetchApi = await blogSchema.findOne({ _id: id });
        if (!fetchApi) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Data fetched successfully", data: fetchApi });
    } catch (error) {
        return res.status(500).json({ message: "Data fetch failed", error });
    }
}
