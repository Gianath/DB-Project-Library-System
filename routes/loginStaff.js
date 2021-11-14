const express = require('express');
const router = express.Router();
const {
  getMember,
  getCurrStaff,
  logout,
} = require('../controllers/loginStaff');

router.route('/').post(getMember).get(getCurrStaff).delete(logout);

module.exports = router;
