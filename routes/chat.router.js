var express = require('express');
var router = express.Router();
var chat = require('../controller/chat.controller')

router.post('/add',chat.add)
router.post('/get',chat.getChat)
router.post('/chatHistory',chat.getChatBetween)
router.delete('/delete/:messageId',chat.deleteMessage)

module.exports = router;
