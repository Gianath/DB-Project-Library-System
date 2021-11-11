const express = require('express');
const router = express.Router();
const { getMember, getCurrMember } = require('../controllers/loginMember');

router.route('/').post(getMember).get(getCurrMember);

module.exports = router;
