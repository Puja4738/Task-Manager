import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
      return;
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};