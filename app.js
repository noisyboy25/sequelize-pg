const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const sequelize = new Sequelize('postgres://postgres:12345@:5432/postgres');

try {
    sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));

} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const User = sequelize.define('user', {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

(async () => {
    await sequelize.sync({ force: true })
})();

app.use(express.json());
app.use(express.static(path.resolve('client/build')));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

app.post('/users', async (req, res) => {
    const data = req.body;
    console.log(req.body);

    if (data.name) {
        const newUser = await User.create({ name: data.name });
        console.log(newUser.toJSON());
        return res.send(newUser.toJSON());
    }
    res.send('No name provided');
})

app.listen(PORT, () => console.log(`Listening port ${PORT}...`));