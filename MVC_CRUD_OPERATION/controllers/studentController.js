const db = require('../config/dbConfig')


// Get all Student Records
async function GetAllStudentData(req, res) {
    try {
        const selectQuery = 'SELECT * FROM students';
        const [records] = await db.query(selectQuery);
        console.log('Executing :: ' + selectQuery);

        if (!records || records.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Student Found'
            });
        }

        res.status(200).json({
            success: true,
            totalStudents: records.length,
            records: records
        });

    } catch (error) {
        console.error("Error in GetAllStudentData:", error);
        res.status(500).json({
            success: false,
            message: 'Error in Select All Student API',
            error: error.message
        });
    }
}
// Get Student Records by id 
async function GetStudentDataByID(req, res) {
    try {
        const id = req.params.id;
        const selectQuery = 'SELECT * FROM students where id = ?';
        console.log('Executing :: ' + selectQuery);

        const [records] = await db.query(selectQuery, id);

        if (!records || records.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No Student Found at id ${id}`
            });
        }

        res.status(200).json({
            success: true,
            record: records
        });

    } catch (error) {
        console.error("Error in GetStudentDataByID:", error);
        res.status(500).json({
            success: false,
            message: 'Error in Select Student by ID API',
            error: error.message
        });
    }
}

async function insertStudentRecord(req, res) {
    try {
        const { name, roll_no, fees, class: className, medium } = req.body;
        const insertQuery = 'INSERT INTO students (name, roll_no, fees, class, medium) VALUES (?, ?, ?, ?, ?)'
        console.log('Executing :: ' + insertQuery);

        let affectedRow = 0;

        const [result] = await db.query(insertQuery, [name, roll_no, fees, className, medium]);
        affectedRow = result.affectedRows;

        if (affectedRow === 0) {
            res.status(404).json({
                success: false,
                message: 'Student not inserted'
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Student inserted successfully',
                insertedId: result.insertId
            });
        }
    } catch (error) {
        console.error("Error in Inserting Student Record :", error);
        res.status(500).json({
            success: false,
            message: 'Error in Inserting Student Record API',
            error: error.message
        });
    }
}


module.exports = {
    GetAllStudentData,
    GetStudentDataByID,
    insertStudentRecord
}

