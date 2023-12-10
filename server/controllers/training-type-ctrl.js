const TrainingType = require('../models/training-type-model')
const {readFileSync} = require("fs");
const {join} = require("path");

createTrainingType = async (req, res) => {
    try {
        const newTrainingType = await TrainingType.create({
                name: req.body.name,
                description: req.body.description,
                image: `public/images/training-types/${req.file.filename}`
            }
        );
        res.json(newTrainingType);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

updateTrainingType = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    TrainingType.findOne({_id: req.params.id}, (err, trainingType) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'TrainingType not found!',
            })
        }
        trainingType.name = body.name
        trainingType.time = body.time
        trainingType.rating = body.rating
        trainingType
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: trainingType._id,
                    message: 'TrainingType updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'TrainingType not updated!',
                })
            })
    })
}

deleteTrainingType = async (req, res) => {
    await TrainingType.findOneAndDelete({_id: req.params.id}, (err, trainingType) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!trainingType) {
            return res
                .status(404)
                .json({success: false, error: `TrainingType not found`})
        }

        return res.status(200).json({success: true, data: trainingType})
    }).catch(err => console.log(err))
}

getTrainingTypeById = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const element = await TrainingType.findById(id);

        console.log(element);

        if (!element) {
            return res.status(404).json({error: 'Element not found'});
        }

        res.json(element);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

getTrainingTypes = async (req, res) => {
    TrainingType.find().then((trainingTypes) => {
        return res.status(200).json({success: true, data: trainingTypes})
    }).catch(err => console.log(err))
}

module.exports = {
    createTrainingType,
    updateTrainingType,
    deleteTrainingType,
    getTrainingTypes,
    getTrainingTypeById,
}