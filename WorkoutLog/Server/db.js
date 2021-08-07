const Sequelize = require('sequelize');
const sequelize = new Sequelize('workoutLog', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to workoutLog postgres database');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;