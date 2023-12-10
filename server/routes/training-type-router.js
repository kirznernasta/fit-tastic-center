const express = require('express')

const TrainingTypeCtrl = require('../controllers/training-type-ctrl')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/training-types')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({storage: storage});

const router = express.Router()
const auth = require('../auth');

router.post('/training-type', auth, upload.single('image'), TrainingTypeCtrl.createTrainingType)
router.put('/training-type/:id', auth, TrainingTypeCtrl.updateTrainingType)
router.delete('/training-type/:id', auth, TrainingTypeCtrl.deleteTrainingType)
router.get('/training-type/:id', TrainingTypeCtrl.getTrainingTypeById)
router.get('/training-types', TrainingTypeCtrl.getTrainingTypes)

module.exports = router