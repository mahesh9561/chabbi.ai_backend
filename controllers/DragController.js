const dragSchema = require('../models/dragSchema');
const mongoose = require('mongoose');

exports.addQuestion = async (req, res) => {
    const { questions, img, options, progess, answare, timmer, topic } = req.body;

    const existingQuestion = await dragSchema.findOne({ questions });

    if (existingQuestion) {
        return res.status(400).json({
            success: false,
            message: "A Question already exists. Please choose a different Question."
        });
    }

    const question = new dragSchema({
        questions,
        timmer,
        progess,
        answare,
        img: img || "https://example.com/default-image.jpg",
        options: options || [],
        topic
    });

    try {
        const result = await question.save();
        res.status(201).json({
            success: true,
            message: "Question saved successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to save question",
            error: error.message
        });
    }
};

// exports.viewQuestion = async (req, res) => {
//     try {
//         const fetchApi = await dragSchema.find({}); // Fetch all documents from the collection

//         // Handle the case where no documents are found
//         if (!fetchApi || fetchApi.length === 0) {
//             return res.status(404).json({ message: "No data found" });
//         }

//         console.log("Fetched Data: ", fetchApi); // Log the fetched data
//         return res.status(200).json({ message: "Data fetched successfully", data: fetchApi });
//     } catch (error) {
//         console.error("Error fetching data: ", error); // Log the error
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };


exports.viewTopics = async (req, res) => {
    try {
        const topics = await dragSchema.distinct('topic');

        res.status(200).json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.viewQuestion = async (req, res) => {
    try {
        const { topic } = req.query; // Extract the topic from the query parameters

        // Handle the case where topic is not provided
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }

        // Fetch documents matching the topic from the collection
        const fetchApi = await dragSchema.find({ topic });

        // Handle the case where no documents are found
        if (!fetchApi || fetchApi.length === 0) {
            return res.status(404).json({ message: `No data found for topic: ${topic}` });
        }

        console.log("Fetched Data: ", fetchApi); // Log the fetched data
        return res.status(200).json({ message: "Data fetched successfully", data: fetchApi });
    } catch (error) {
        console.error("Error fetching data: ", error); // Log the error
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
