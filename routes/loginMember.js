const express = require('express');
const router = express.Router();
const {
  getMember,
  getCurrMember,
  logout,
  getSingleStudent,
} = require('../controllers/loginMember');

router.route('/').post(getMember).get(getCurrMember).delete(logout);
router.route('/:id').get(getSingleStudent);

module.exports = router;
