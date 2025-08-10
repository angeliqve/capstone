const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
const userController = require('../controllers/user-controller');

// GET /api/users
router.get(
  '/', 
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.getAllUsers);

// GET /api/users/students
router.get(
  '/students',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.getAllUsers,
);

router.get(
  '/:id', 
  authenticationMiddleware, 
  onlyAdminMiddleware, 
  userController.getUserById
);

// POST /api/users
router.post(
  '/', 
  authenticationMiddleware, 
  onlyAdminMiddleware, 
  userController.createUser
);

// PATCH /api/users
router.patch(
  '/:id', 
  authenticationMiddleware, 
  onlyAdminMiddleware, 
  userController.updateUserById
);

// DELETE /api/users/:id -> hanya boleh oleh ADMIN
router.delete(
  '/:id',
  authenticationMiddleware,
  onlyAdminMiddleware,
  userController.deleteById,
);

module.exports = router;
