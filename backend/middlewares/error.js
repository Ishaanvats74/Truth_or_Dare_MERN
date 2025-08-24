class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
    };
};

export const errorMiddleware = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";
    console.log(err);

    if (err.code === 11000) {
        const statuscode = 400;
        const message = "Duplicate field value entered";
        err = new ErrorHandler(message,statuscode);
    };
    if (err.name === "CastError") {
        const statuscode = 400;
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,statuscode);
    };
    if (err.name === "GoogleGenerativeAIFetchError") {
        const statuscode = 400;
        const message = err.message || "Gemini API request failed" ;
        err = new ErrorHandler(message,statuscode);
    };

    return res.status(err.statuscode).json({
        success:false,
        message:err.message,
    });
};

export default ErrorHandler;