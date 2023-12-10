const express = require('express')

const TrainingCtrl = require('../controllers/training-ctrl')
const auth = require("../auth");

const router = express.Router()

router.post('/training', auth, TrainingCtrl.createTraining)
router.put('/training/:id', auth, TrainingCtrl.updateTraining)
router.delete('/training/:id', auth, TrainingCtrl.deleteTraining)
router.get('/training/:id', TrainingCtrl.getTrainingById)
router.get('/trainings', TrainingCtrl.getTrainings)

module.exports = router