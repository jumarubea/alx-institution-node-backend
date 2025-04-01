const db = require("../config/db");

exports.generateReport = (req, res) => {
  const { student_id, supervisor_id, report_type } = req.body;

  // Validate required fields
  if (!student_id && !supervisor_id) {
    return res.status(400).json({
      message: "Missing required fields: student_id or supervisor_id",
    });
  }

  // Build the SQL query dynamically based on the provided filters
  let sql = `
    SELECT l.weekno, l.activities, l.status, f.feedback AS feedback, u.fullname AS supervisor_name
    FROM logbooks AS l
    LEFT JOIN feedback AS f ON l.id = f.logbook_id
    LEFT JOIN users AS u ON f.supervisor_id = u.id
    WHERE 1=1
  `;

  const params = [];
  if (student_id) {
    sql += " AND l.student_id = ?";
    params.push(student_id);
  }
  if (supervisor_id) {
    sql += " AND f.supervisor_id = ?";
    params.push(supervisor_id);
  }

  // Optionally filter by report type (e.g., weekly, monthly, custom)
  if (report_type) {
    if (report_type === "weekly") {
      sql += " AND WEEK(l.createdAt) = WEEK(CURDATE())";
    } else if (report_type === "monthly") {
      sql += " AND MONTH(l.createdAt) = MONTH(CURDATE())";
    }
  }

  // Execute the query
  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given filters" });
    }

    // Generate the report (you can format the data as needed)
    const report = {
      student_id,
      supervisor_id,
      report_type: report_type || "custom",
      generated_at: new Date(),
      data: results,
    };

    res.status(200).json({
      message: "Report generated successfully",
      report,
    });
  });
};
