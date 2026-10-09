import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const SECRET = process.env.JWT_SECRET || 'campus-placement-demo-secret-change-me';
export const hashPassword = (p)=>bcrypt.hashSync(p, 10);
export const comparePassword = (p,h)=>bcrypt.compareSync(p,h);
export const signToken = (user)=>jwt.sign({id:user.id,name:user.name,email:user.email,role:user.role}, SECRET, {expiresIn:'8h'});
export function auth(req,res,next){
  const token = req.headers.authorization?.replace('Bearer ','');
  if(!token) return res.status(401).json({message:'Authentication required.'});
  try { req.user=jwt.verify(token, SECRET); next(); } catch { return res.status(401).json({message:'Session expired. Please log in again.'}); }
}
export const roles=(...allowed)=>(req,res,next)=>allowed.includes(req.user.role)?next():res.status(403).json({message:'You do not have permission to perform this action.'});
