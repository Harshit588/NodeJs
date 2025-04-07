const db = require('../config/dbConfig')


// Get all Student Records :: GET
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

// Get Student Records by id :: GET(/:id)
async function GetStudentDataByID(req, res) {
    try {
        const id = req.params.id;
        const selectQuery = 'SELECT * FROM students WHERE id = ?';
        console.log('Executing :: ' + selectQuery + ' with ID :: ' + id);

        const [records] = await db.query(selectQuery, [id]); // 🔧 FIXED HERE

        if (!records || records.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No Student Found at id ${id}`
            });
        }

        res.status(200).json({
            success: true,
            record: records[0] // optionally return only the first record
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

//Insert the student record :: POST
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

// Delete the student record :: DELETE
async function deleteStudentRecord(req, res) {
    try {
        const id = req.params.id;
        const deleteQuery = 'DELETE FROM students WHERE id = ?';
        console.log('Executing :: ' + deleteQuery + ' with ID :: ' + id);

        const [result] = await db.query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `No Student Found at id ${id}`
            });
        }

        res.status(200).json({
            success: true,
            message: `Student deleted successfully at id: ${id}`
        });

    } catch (error) {
        console.error("Error in Delete Student record:", error);
        res.status(500).json({
            success: false,
            message: 'Error in delete Student by ID API',
            error: error.message
        });
    }
}

// Update the student record :: UPDATE
async function updateStudentRecord(req, res) {
    try {
        const id = req.params.id;
        const { name, roll_no, fees, class: className, medium } = req.body;

        const updateQuery = `
                UPDATE students 
                SET name = ?, roll_no = ?, fees = ?, class = ?, medium = ?
                WHERE id = ?
            `;

        console.log(`Executing :: ${updateQuery} with ID :: ${id}`);

        const [result] = await db.query(updateQuery, [name, roll_no, fees, className, medium, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `No student found with id ${id}`
            });
        }

        res.status(200).json({
            success: true,
            message: `Student record updated successfully at id ${id}`
        });
    } catch (error) {
        console.error("Error in updateStudentRecord:", error);
        res.status(500).json({
            success: false,
            message: 'Error in updating student record',
            error: error.message
        });
    }
}


module.exports = {
    GetAllStudentData,
    GetStudentDataByID,
    insertStudentRecord,
    deleteStudentRecord,
    updateStudentRecord
}

