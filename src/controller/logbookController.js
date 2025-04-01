const multer = require("multer");
const db = require("../config/db");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.submitLogbook = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed" });
    }

    const {
      student_id,
      file_details,
      weekno,
      activities,
      status,
      supervisor_id,
    } = req.body;
    const file = req.file ? req.file.buffer : null; // Get the file buffer

    // Validate required fields
    if (!student_id || !weekno || !activities || !supervisor_id) {
      return res.status(400).json({
        message:
          "Missing required fields: student_id, weekno, activities, or supervisor_id",
      });
    }

    // Validate file type (e.g., only allow PDFs)
    if (req.file && req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    // Insert logbook entry into the database
    const sql = `
      INSERT INTO logbooks (student_id, file, file_details, weekno, activities, status, supervisor_id, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    db.query(
      sql,
      [
        student_id,
        file,
        file_details || null,
        weekno,
        activities,
        status || "pending",
        supervisor_id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          message: "Logbook entry submitted successfully",
          logbookId: result.insertId,
        });
      }
    );
  });
};

exports.getLogbookDetailss = (req, res) => {
  const sql = `
    SELECT file_details, weekno, activities, status, supervisor_id
    FROM logbooks
    WHERE student_id = ?
  `;
  db.query(sql, [req.params.student_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};
exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Validate required fields
  if (!status) {
    return res.status(400).json({ message: "Missing required field: status" });
  }

  // Update logbook entry status in the database
  const sql = `
        UPDATE logbooks
        SET status = ?, updatedAt = NOW()
        WHERE id = ?
    `;
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Logbook entry status updated successfully",
      affectedRows: result.affectedRows,
    });
  });
};
