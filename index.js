const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.POSRT || 3000;
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended:true}));
app.use(todoRoutes);
app.use(express.static(path.join(__dirname, 'public')));


async function start(){
    try {
        await mongoose.connect('mongodb+srv://rina:1234@cluster0-btj6f.azure.mongodb.net/test', {
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on http://localhost:${PORT}`)
        });


    } catch (e) {
        console.log(e)
    }
}

start();
