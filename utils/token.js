import jwt from 'jsonwebtoken';

/**
 *
 * @param {any} payload
 * @returns generated token
 */
export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  console.log(secret)
  if (!secret) throw new Error('env var :  jwt secret manquant');
  const token = jwt.sign(payload, secret, {
    expiresIn: 24 * 3600 * 1000,
  });
  return token;
};

/**
 *
 * @param {String} token
 * @returns false or verified value
 */
export const verifyToken = (token) => {
  try {

    console.log('token ', token)
    console.log(jwt.verify(token, process.env.JWT_SECRET))
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log('ERREUR DANS VERIFY TOKEN : ', e);
    return false;
  }
};