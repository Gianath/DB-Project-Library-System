const express = require('express');
const router = express.Router();
const { getMember } = require('../controllers/loginMember');

router.route('/').post(getMember);

module.exports = router;
