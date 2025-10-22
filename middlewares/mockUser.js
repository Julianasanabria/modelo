// middleware: mockUser.js
// Este middleware pone un usuario de prueba en req.user para desarrollo.
// Contiene además el ejemplo (comentado) de verificación JWT para que tu compañero lo active cuando quiera.

/** USUARIO MOCK: cambia el _id si necesitas otro. */
const MOCK_USER_ID = '68f178924a5a62780abc7772'; // id de la secretaria solicitado

const mockUser = (req, res, next) => {
  // Poblamos req.user con el id y rol 'secretaria' para bypass temporal
  req.user = { _id: MOCK_USER_ID, role: 'secretaria' };
  next();
};

module.exports = mockUser;

/* Ejemplo comentado de verificación JWT (para que el compañero lo active):
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const auth = req.header('Authorization') || '';
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Token malformado' });
  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET || 'secret123', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
}
*/
