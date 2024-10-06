// express.d.ts
import { IUser } from "../models/User";
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add user as optional, in case it's not always populated
    }
  }
}
