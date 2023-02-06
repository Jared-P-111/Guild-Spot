import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

/*
  This function generates a JSON Web Token. 
  Its here in its here so it can be imported in multiple locations. 
*/

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '3d' });
};
