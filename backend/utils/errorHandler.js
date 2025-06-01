/**
 * Global Error Handler Middleware
 * Provides consistent error response format across the application
 *
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 *
 * Response Format:
 * {
 *   status: 'error',
 *   message: 'Error message here'
 * }
 */
module.exports = (err, req, res, next) => {
  // Set default status code to 500 if not specified
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
