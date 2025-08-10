const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyAdminMiddleware = require('../middlewares/only-admin-middleware');
const courseController = require('../controllers/course-controller');

// GET /api/courses
router.get('/', courseController.getAllCourses);

// GET /api/courses/{slug}
router.get('/:slug', courseController.getCourseBySlug);

// auth guard untuk operasi CUD
router.use(authenticationMiddleware, onlyAdminMiddleware);

// POST /api/courses
router.post('/', courseController.createCourse);

// PATCH /api/courses/{slug}
router.patch('/:slug', courseController.updateCourseBySlug);

// DELETE /api/courses/{slug}
router.delete('/:slug', courseController.deleteCourseBySlug);

module.exports = router;
