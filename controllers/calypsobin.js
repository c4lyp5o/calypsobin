const Calypsobin = require('../models/calypsobin');
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

exports.OpenForm = async (req, res) => {
    res.render('index', { title: 'Calypsobin' });
}

exports.Pasting =  [
    // Validate and sanitize the fields.
    body('title').trim().isLength({ min: 1 }).escape().withMessage('Title cannot be empty.'),
    body('description').trim().isLength({ min: 1 }).escape().withMessage('Description cannot be empty.'),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      
      // Create uniqueid
      const unique = crypto.randomBytes(3*24).toString('hex');

      
      const pasted = new Calypsobin({
                    title: req.body.title,
                    description: req.body.description,
                    created_at: new Date(),
                    created_by: 'Public',
                    uniqueID: unique
                })
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('index', { title: 'Calypsobin', pasted: pasted, errors: errors.array()});
        return;
      }
      else {
        pasted.save(function (err) {
            if (err) { return next(err); }
            res.render('show', { title: 'Calypsobin', paste: pasted });
          }); 
        }
    }
];

exports.ListPastes = async (req, res) => {
    try {
        Calypsobin.find({})
        .sort([['created_at', 'ascending']])
        .exec(function (err, pastes) {
          res.render('list', { title: 'All pastebins', pastes: pastes });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.ShowPasteAfterPasting = async (req, res) => {
    try {
        Calypsobin.findOne({ uniqueID: req.params.uniqueID })
        .exec(function (err, paste) {
            res.render('show', { title: req.params.uniqueID, paste: paste });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.DisplayPaste = async (req, res) => {
    try {
        Calypsobin.findOne({ uniqueID: req.params.uniqueID })
        .exec(function (err, paste) {
            res.render('bins', { title: 'Calypsobin', paste: paste });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
            