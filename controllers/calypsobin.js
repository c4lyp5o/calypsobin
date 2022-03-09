const Calypsobin = require('../models/calypsobin');
const crypto = require("crypto");

exports.OpenForm = async (req, res) => {
    res.render('index', { title: 'Calypsobin' });
}

exports.Pasting = async (req, res) => {
    try {
        const unique = crypto.randomBytes(3*24).toString('hex');
        const pasted = new Calypsobin({
            title: req.body.title,
            description: req.body.description,
            created_at: new Date(),
            created_by: 'Public',
            uniqueID: unique
        });
        await pasted.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

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

exports.ShowPaste = async (req, res) => {
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
            