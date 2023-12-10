const express = require('express')

const TrainerCtrl = require('../controllers/trainer-ctrl')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/trainers')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({storage: storage});

const router = express.Router()
const auth = require("../auth");

router.post('/trainer', auth, upload.single('image'), TrainerCtrl.createTrainer)
router.put('/trainer/:id', auth, TrainerCtrl.updateTrainer)
router.delete('/trainer/:id', auth, TrainerCtrl.deleteTrainer)
router.get('/trainer/:id', TrainerCtrl.getTrainerById)
router.get('/trainers', TrainerCtrl.getTrainers)

module.exports = router