// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err.stack);

    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        // Handle Mongoose validation errors
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(', ');
    } else if (err.name === 'CastError') {
        // Handle invalid MongoDB ObjectId
        statusCode = 400;
        message = 'Invalid ID format';
    } else if (err.code === 11000) {
        // Handle duplicate key errors
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: message,
        // Only include stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

export default errorHandler; 