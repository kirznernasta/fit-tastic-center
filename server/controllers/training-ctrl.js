const Training = require('../models/training-model')

createTraining = async (req, res) => {
    try {
        const newTraining = await Training.create({
                trainingType: req.body.trainingType,
                start: req.body.start,
                end: req.body.end,
                days: req.body.days,
            }
        );
        res.json(newTraining);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

updateTraining = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    try {
        const updatedResult = await Training.findByIdAndUpdate({_id: req.params.id}, req.body);
        return res.status(200).json({
            success: true,
            "training": updatedResult,
            message: 'TrainingType updated!',
        });
    } catch (e) {
        return res.status(404).json({
            e,
            message: 'Error occurred!',
        });
    }
}

deleteTraining = async (req, res) => {
    await Training.findOneAndDelete({_id: req.params.id}, (err, training) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!training) {
            return res
                .status(404)
                .json({success: false, error: `Training not found`})
        }

        return res.status(200).json({success: true, data: training})
    }).catch(err => console.log(err))
}

getTrainingById = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const element = await Training.findById(id);

        console.log(element);

        if (!element) {
            return res.status(404).json({error: 'Element not found'});
        }

        res.json(element);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

getTrainings = async (req, res) => {
    Training.find().then((trainings) => {
        return res.status(200).json({success: true, data: trainings})
    }).catch(err => console.log(err))
}

module.exports = {
    createTraining,
    updateTraining,
    deleteTraining,
    getTrainings,
    getTrainingById,
}