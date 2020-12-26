const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const sequelize = new Sequelize('postgres://postgres:12345@192.168.0.103:5432/postgres');

try {
    sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));

} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const User = sequelize.define('user', {
    name: {
        type: DataTypes.TEXT,
        validate: { notEmpty: true }
    },
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green',
    },
});

(async () => {
    await sequelize.sync({ alter: true })
})();

app.use(express.json());
app.use(express.static(path.resolve('client/build')));

app.get('/hello', (req, res) => {
    res.send('Hello World');
});

app.get('/users', async (req, res) => {
    const users = await User.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    });
    res.send(users);
});

app.post('/users', async (req, res) => {
    try {
        const { name, favoriteColor } = req.body;
        console.log(req.body);
        let newUser = User.build({ name, favoriteColor });
        await newUser.save();
        console.log(newUser.toJSON());
        return res.send(newUser.toJSON());
    } catch (error) {
        return res.status(500).send(error);
    }
})

app.listen(PORT, () => console.log(`Listening port ${PORT}...`));