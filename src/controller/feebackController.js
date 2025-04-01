const db = require("../config/db");

exports.giveFeedback = async (req, res) => {
  const { logbook_id, feedback } = req.body;
  const supervisor_id = req.user.id;

  // Validate required fields
  if (!logbook_id || !feedback) {
    return res.status(400).json({
      message: "Missing required fields: logbook_id or feedback",
    });
  }

  // Insert feedback into the database
  const sql = `
        INSERT INTO feedback (
          logbook_id, 
          supervisor_id, 
          feedback, 
          createdAt, 
          updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
    `;
  db.query(sql, [logbook_id, supervisor_id, feedback], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedbackId: result.insertId,
    });
  });
};

exports.fetchFeedback = async (req, res) => {
  const logbook_id = req.params.logbook_id;

  // Validate required fields
  if (!logbook_id) {
    return res.status(400).json({
      message: "Missing required field: logbook_id",
    });
  }

  // Fetch feedback from the database
  const sql = `
            SELECT feedback, createdAt, updatedAt
            FROM feedback
            WHERE logbook_id = ?
        `;
  db.query(sql, [logbook_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.fetchFeedbackBySupervisor = async (req, res) => {
  const supervisor_id = req.params.supervisor_id; // Get the supervisor ID from the request parameters

  // Validate required fields
  if (!supervisor_id) {
    return res.status(400).json({
      message: "Missing required field: supervisor_id",
    });
  }

  // Fetch feedback from the database
  const sql = `
                SELECT feedback, createdAt, updatedAt
                FROM feedback
                WHERE supervisor_id = ?
            `;
  db.query(sql, [supervisor_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};
