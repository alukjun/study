const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3306/test');

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: Sequelize.STRING,
    gender: Sequelize.STRING,
    birth: Sequelize.STRING,
    createdAt: Sequelize.STRING,
    updatedAt: Sequelize.STRING,
    version: Sequelize.BIGINT
}, {
        timestamps: false
});

var now = Date.now();

(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

module.exports = Pet;