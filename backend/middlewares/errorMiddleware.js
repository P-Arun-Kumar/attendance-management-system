const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}
    });

};

module.exports = errorHandler;

//Middleware is a function that runs:
//Request → Middleware → Controller → Response
//It works between request and response
//These are middleware:
//app.use(cors());
//app.use(express.json());