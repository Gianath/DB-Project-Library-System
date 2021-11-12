const express = require('express');
const router = express.Router();
const {
  getMember,
  getCurrMember,
  logout,
} = require('../controllers/loginMember');

router.route('/').post(getMember).get(getCurrMember).delete(logout);

module.exports = router;
