const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/api/youtube-suggestions", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        const response = await axios.get(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`CORS Proxy running on port ${PORT}`));
