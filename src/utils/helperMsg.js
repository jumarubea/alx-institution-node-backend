// Error handling middleware
exports.server500 = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
};
