let path = require("path");

const ErrorHandler = (err,req,res,next) => {
    console.log("Middleware Error Handling");
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong";

    // res.status(statuscode).json({
    //     success : false,
    //     message : message,
    //     statusCode : statusCode
    // })
    res.sendFile(path.join(__dirname +'./../views/error.html'));
}

module.exports = ErrorHandler;