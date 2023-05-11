const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const authenticate_user = auth.authenticate_user

const notification = require('../controller/notification.controller')

router.post('/add', authenticate_user, notification.createNotification)
router.post('/get', authenticate_user, notification.getNotification)
router.post('/mark-read', authenticate_user, notification.markNotificationAsRead)
router.post('/mark-all-read', authenticate_user, notification.markAllNotificationAsRead)

module.exports = router
