const { nanoid } = require('nanoid');
const db = require('../config/mysqlDbConfig');
const { initDb } = require('../models/urlShort');

async function generateNewShortUrl(req, res) {

    // Get Conncection check
    db.getConnection((err, connection) => {
        if (err) {
            console.error("❌ DB Connection Failed:", err.message);
        } else {
            console.log("✅ DB Connected Successfully");
            connection.release();
        }
    });

    // create tables
    console.log((await initDb()).toString());


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

        return res.status(201).json({
            Id: result.insertId,
            success: true,
            message: 'Short URL created successfully',
            shortUrl: `http://localhost:3000/api/short/${shortId}`,
            shortId,
            redirectURL
        });
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


module.exports = {
    generateNewShortUrl,
    handleRedirect
};