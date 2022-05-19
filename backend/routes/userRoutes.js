const router = require('express').Router()
const userCtrl = require('../controllers/authController')
const auth = require('../middleware/auth')


router.post('/register', userCtrl.register); //sign up
router.post('/login', userCtrl.login); 
router.get('/user', auth, userCtrl.get_user)
 
module.exports = router;