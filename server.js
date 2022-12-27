const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Articles = require('./models/articles');
const articleRouter = require('./routes/articles');

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'))

// connecting to mongoose
mongoose.connect('mongodb://localhost/blog', () => console.log(`Database connected`));

const PORT = process.env.PORT || 8000;
app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    const articles = await Articles.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter);

app.listen(PORT, () => console.log(`Server Running at PORT ${PORT}`));
