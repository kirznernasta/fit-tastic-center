const express = require('express')

const ArticleCtrl = require('../controllers/article-ctrl')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/articles')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

const upload = multer({storage: storage});

const router = express.Router()

const auth = require("../auth");
router.post('/article', auth, upload.single('image'), ArticleCtrl.createArticle)
router.put('/article/:id', auth, upload.single('image'), ArticleCtrl.updateArticle)
router.delete('/article/:id', auth, ArticleCtrl.deleteArticle)
router.get('/article/:id', ArticleCtrl.getArticleById)
router.get('/articles', ArticleCtrl.getArticles)

module.exports = router