import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser, Role } from "../models/User";

interface JwtPayload {
  id: string;
  role: string;
}

interface CustomRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      req.user = (await User.findById(decoded.id).select("-password")) as IUser;
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin role check
export const admin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user && req.user.role === Role.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

// Blog writer role check
export const blogWriter = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.user &&
    (req.user.role === Role.BLOGGER || req.user.role === Role.ADMIN)
  ) {
    next();
  } else {
    res.status(403).json({ message: "Blog writer access only" });
  }
};
