const Users = require("./usersModel");
const Report = require("./reportModel");
const Feedback = require("./feedbackModel");
const Logbook = require("./logbookModel");

// A User can generate many Reports
Users.hasMany(Report, {
  foreignKey: "generated_by",
  as: "report",
});

Report.belongsTo(Users, {
  foreignKey: "generated_by",
  as: "user",
});

// A User can give Feedback on many Logbook entries
Users.hasMany(Feedback, {
  foreignKey: "supervisor_id",
  as: "feedbacks",
});
Feedback.belongsTo(Users, {
  foreignKey: "supervisor_id",
  as: "supervisor",
});

// A Logbook entry can have many Feedbacks
Logbook.hasMany(Feedback, {
  foreignKey: "logbook_id",
  as: "feedbacks",
});
Feedback.belongsTo(Logbook, {
  foreignKey: "logbook_id",
  as: "logbook",
});

// Export models with associations
module.exports = {
  Users,
  Report,
  Feedback,
  Logbook,
};
