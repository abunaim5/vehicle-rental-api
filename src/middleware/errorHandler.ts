import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({
        message: err.message || 'Internal server error'
    });
};

export default globalErrorHandler;