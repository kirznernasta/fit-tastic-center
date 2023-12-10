const Trainer = require('../models/trainer-model')
const {readFileSync} = require("fs");
const {join} = require("path");

createTrainer = async (req, res) => {
    try {
        const newTrainer = await Trainer.create({
                fullName: req.body.fullName,
                education: req.body.education,
                coachingExperience: req.body.coachingExperience,
                groupTrainings: req.body.groupTrainings.split(', '),
                image: `public/images/trainers/${req.file.filename}`
            }
        );
        res.json(newTrainer);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

updateTrainer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Trainer.findOne({_id: req.params.id}, (err, trainer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Trainer not found!',
            })
        }
        trainer.name = body.name
        trainer.time = body.time
        trainer.rating = body.rating
        trainer
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: trainer._id,
                    message: 'Trainer updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Trainer not updated!',
                })
            })
    })
}

deleteTrainer = async (req, res) => {
    await Trainer.findOneAndDelete({_id: req.params.id}, (err, trainer) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!trainer) {
            return res
                .status(404)
                .json({success: false, error: `Trainer not found`})
        }

        return res.status(200).json({success: true, data: trainer})
    }).catch(err => console.log(err))
}

getTrainerById = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const element = await Trainer.findById(id);

        console.log(element);

        if (!element) {
            return res.status(404).json({error: 'Element not found'});
        }

        res.json(element);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

getTrainers = async (req, res) => {
    Trainer.find().then((trainers) => {
        return res.status(200).json({success: true, data: trainers})
    }).catch(err => console.log(err))
}

module.exports = {
    createTrainer,
    updateTrainer,
    deleteTrainer,
    getTrainers,
    getTrainerById,
}