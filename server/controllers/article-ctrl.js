const Article = require('../models/article-model')
const {readFileSync} = require("fs");
const {join} = require("path");

createArticle = async (req, res) => {
    console.log('ARTICLE');
    console.log(req);
    try {
        const newArticle = await Article.create({
                title: req.body.title,
                firstSentence: req.body.firstSentence,
                fullText: req.body.fullText,
                image: `public/images/articles/${req.file.filename}`
            }
        );
        res.json(newArticle);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

updateArticle = async (req, res) => {
    const body = req.body
    let id = req.params.id;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    let article = Article.findOne({_id: id}).catch((error) => {
        return res.status(404).json({
            error,
            message: 'Article not updated!',
        })
    })
    console.log(body)
    article.title = body.title
    article.firstSentence = body.firstSentence
    article.fullText = body.fullText
    if (req.file) {
        article.image = `public/images/articles/${req.file.filename}`
    }
    Article.updateOne({_id: id}, article)

        .then(() => {
            return res.status(200).json({
                success: true,
                id: article._id,
                message: 'Article updated!',
            })
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: 'Article not updated!',
            })
        })
}

deleteArticle = async (req, res) => {
    await Article.deleteOne({_id: req.params.id}).then(() => {
        return res.status(200).json({success: true, data: req.params.id})
    })
        .catch(err => res.status(400).json({success: false, error: err}))
}

getArticleById = async (req, res) => {
    const id = req.params.id;

    try {
        const element = await Article.findById(id);

        if (!element) {
            return res.status(404).json({error: 'Element not found'});
        }

        res.json(element);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

getArticles = async (req, res) => {
    Article.find().then((articles) => {
        return res.status(200).json({success: true, data: articles})
    }).catch(err => console.log(err))
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticles,
    getArticleById,
}