const express = require('express');
const router = express.Router();
const pastecon = require('../controllers/calypsobin');

/* GET home page. */
router.get('/', pastecon.OpenForm);
router.post('/', pastecon.Pasting);
router.get('/list', pastecon.ListPastes);
router.get('/show/:uniqueID', pastecon.ShowPaste);


module.exports = router;
