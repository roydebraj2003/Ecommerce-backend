const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.status === 404) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
