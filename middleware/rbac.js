const { pool } = require('../config/db');

module.exports = function (allowedRoles) {
  return async (req, res, next) => {
    try {
      const { rows } = await pool.query(
        'SELECT roles.name FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = $1',
        [req.user.id]
      );
      
      if (rows.length === 0) {
        return res.status(401).json({ msg: 'User role not found' });
      }

      const userRole = rows[0].name;
      
      if (userRole === 'admin') {
        req.user.role = userRole;
        return next();
      }

      if (allowedRoles.includes(userRole)) {
        req.user.role = userRole;
        next();
      } else {
        return res.status(403).json({ msg: 'Access denied: insufficient permissions' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error in RBAC middleware' });
    }
  };
};
