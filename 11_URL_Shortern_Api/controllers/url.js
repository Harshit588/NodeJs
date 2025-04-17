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
        const [result] = await db.promise().query(insertQuery, [shortId, redirectURL]);

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

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    const findQuery = `SELECT * FROM urls WHERE shortId = ?`;
    db.query(findQuery, [shortId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Short URL not found'
            });
        }

        const url = results[0];

        // Log visit
        const insertVisit = `INSERT INTO visit_history (url_id) VALUES (?)`;
        db.query(insertVisit, [url.id], (visitErr) => {
            if (visitErr) console.error('Visit Log Error:', visitErr.message);
        });

        // Redirect
        return res.redirect(url.redirectURL);
    });
}

async function getAllUrlsWithVisits(req, res) {
    const urlQuery = `SELECT * FROM urls`;
    const visitQuery = `SELECT * FROM visit_history ORDER BY visitedAt ASC`;

    try {
        const [urls] = await db.promise().query(urlQuery);
        const [visits] = await db.promise().query(visitQuery);

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