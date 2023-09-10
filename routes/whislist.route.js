const router = require('express-promise-router')();
const { auth } = require('../app/middlewares/authrization.middleware');
const whislistController = require('../app/controllers/whistlist.controller');

router.get('/whislists', auth(['user']), whislistController.getAllWhislist);
router.post('/whislists', auth(['user']), whislistController.addWhislist);

module.exports = router;
