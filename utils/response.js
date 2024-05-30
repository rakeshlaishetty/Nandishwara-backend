const errorResponse = (res, statusCode=500, err) => {
    return res.status((statusCode || 500)).json({ success: false, message: (err?.message || "Something Went Wrong"), stack: process.env.NODE_ENV === 'production' ? null : err.stack });
};

const successResponse = (res, statusCode, data, message = "success") => {
    return res.status(statusCode).json({ success: true, data: data, message: message });
};

module.exports = { errorResponse, successResponse };  