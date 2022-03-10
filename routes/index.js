const express = require('express');
const router = express.Router();
const pastecon = require('../controllers/calypsobin');

router.get('/', pastecon.OpenForm);
router.post('/', pastecon.Pasting);
router.get('/list', pastecon.ListPastes);
router.get('/show/:uniqueID', pastecon.ShowPasteAfterPasting);
router.get('/bins/:uniqueID', pastecon.DisplayPaste);

module.exports = router;
