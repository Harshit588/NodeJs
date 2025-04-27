const { nanoid } = require('nanoid');
const db = require('../config/mysqlDbConfig');

async function generateNewShortUrl(req, res) {

    const { url } = req.body;
    const redirectURL = url;

    if (!redirectURL) {
        return res.status(400).json({
            success: false,
            message: 'redirectURL is required'
        });
    }

    const shortId = nanoid(8); // Generates shortId like "XyZ123ab"
    const insertQuery = `INSERT INTO urls (shortId, redirectURL) VALUES (?, ?)`;

    try {
        const [result] = await db.query(insertQuery, [shortId, redirectURL]);

        const id = `http://localhost:3000/api/short/${shortId}`;

        return res.render('home', {
            shortID: id
        })

        // Return JSON data =>
        // return res.status(201).json({
        //     Id: result.insertId,
        //     success: true,
        //     message: 'Short URL created successfully',
        //     shortUrl: `http://localhost:3000/api/short/${shortId}`,
        //     shortId,
        //     redirectURL
        // });

    } catch (err) {
        console.error("Insert Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to create short URL"
        });
    }
}

function handleRedirect(req, res) {
    console.log("handleRedirect hit");

    const shortId = req.params.shortId;
    console.log("shortId:", shortId);

    if (!shortId) {
        return res.status(400).json({ message: "Short ID is required" });
    }

    const findQuery = `SELECT redirectURL FROM urls WHERE shortId = ? LIMIT 1`;

    // Increase timeout duration to allow more time for DB query
    const timeout = setTimeout(() => {
        console.error("DB query is hanging ❌");
        return res.status(500).json({ message: "DB query timed out" });
    }, 10000); // Increased timeout to 10 seconds

    console.log("Executing DB query...");
    db.query(findQuery, [shortId], (err, results) => {
        clearTimeout(timeout); // clear if query finishes
        console.log("DB query completed");

        if (err) {
            console.error("DB ERROR:", err.message);
            return res.status(500).json({ message: "DB Error" });
        }

        console.log("Query results:", results);

        if (results.length === 0) {
            console.error("No results found for shortId:", shortId);
            return res.status(404).json({ message: "Short URL not found" });
        }

        const url = results[0];
        let redirectURL = url.redirectURL;

        if (!redirectURL) {
            console.error("Redirect URL is empty for shortId:", shortId);
            return res.status(400).json({ message: "Invalid redirect URL" });
        }

        if (!redirectURL.startsWith("http://") && !redirectURL.startsWith("https://")) {
            redirectURL = "http://" + redirectURL;
        }

        console.log("Redirecting to:", redirectURL);
        return res.redirect(redirectURL);
    });
}

async function getAllUrlsWithVisits(req, res) {
    const urlQuery = `SELECT * FROM urls`;
    const visitQuery = `SELECT * FROM visit_history ORDER BY visitedAt ASC`;

    try {
        const [urls] = await db.query(urlQuery);
        const [visits] = await db.query(visitQuery);

        // Group visit history under corresponding URL
        const urlMap = urls.map(url => {
            const visitHistory = visits
                .filter(v => v.url_id === url.id)
                .map(v => ({
                    visitId: v.id,
                    visitedAt: v.visitedAt
                }));
            return {
                ...url,
                visitHistory
            };
        });
        console.log("Send all Data to Client in JSON formate");

        res.status(200).json(urlMap);

    } catch (error) {
        console.error("Fetch error:", error.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    generateNewShortUrl,
    handleRedirect,
    getAllUrlsWithVisits
};