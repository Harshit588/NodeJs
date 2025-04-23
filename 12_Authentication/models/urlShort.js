const db = require("../config/mysqlDbConfig");

async function initDb() {

    const logs = [];

    db.getConnection((err, connection) => {
        if (err) {
            logs.push("\n❌ DB Connection Failed:", err.message, "\n");
        } else {
            logs.push("✅ DB Connected Successfully");
            connection.release();
        }
    });

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

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
    `;

    try {
        await db.query(createUsersTable);
        logs.push("\n✅ users table is ready in DB");
    } catch (err) {
        logs.push("❌ Error creating users table: " + err.message);
    }

    try {
        await db.query(createUrlsTable);
        logs.push("\n✅ urls table is ready in DB");
    } catch (err) {
        logs.push("❌ Error creating urls table: " + err.message);
    }

    try {
        await db.query(createVisitHistoryTable);
        logs.push("\n✅ visit_history table is ready in DB");
    } catch (err) {
        logs.push("❌ Error creating visit_history table: " + err.message);
    }

    console.log(logs.toString());
}
module.exports = {
    initDb
};
