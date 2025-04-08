const db = require("../config/mysqlDbConfig");

async function initDb() {
    const logs = [];

    const createUrlsTable = `
        CREATE TABLE IF NOT EXISTS urls (
            id INT AUTO_INCREMENT PRIMARY KEY,
            shortId VARCHAR(100) NOT NULL UNIQUE,
            redirectURL VARCHAR(255) NOT NULL
        )
    `;

    const createVisitHistoryTable = `
        CREATE TABLE IF NOT EXISTS visit_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url_id INT NOT NULL,
            visitedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
        )
    `;

    try {
        await db.promise().query(createUrlsTable);
        logs.push("✅ urls table is ready in DB");
    } catch (err) {
        logs.push("❌ Error creating urls table: " + err.message);
    }

    try {
        await db.promise().query(createVisitHistoryTable);
        logs.push("\n✅ visit_history table is ready in DB");
    } catch (err) {
        logs.push("❌ Error creating visit_history table: " + err.message);
    }

    return logs;
}

module.exports = {
    initDb
};
