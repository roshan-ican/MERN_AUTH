const express = require('express')
const router = express.Router()
const usersController = require('../controller/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

// router.get('/', isAuthenticated, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// router.route('/users').get(usersController.getAllUsers)
router.route('/:id').get(usersController.getUser)

module.exports = router