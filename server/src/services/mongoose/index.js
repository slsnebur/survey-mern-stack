const mongoose = require('mongoose');
const { mongo } = require('../../config')
const AutoIncrement = require('mongoose-sequence')(mongoose);

// const { mongo } = config;

for(const [key, value] of Object.entries(mongo.options)){
    mongoose.set(key, value);
}


mongoose.connection.on('connected', (res) => {
    console.log('MongoDB connected successfully')
});


mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1)
});

mongoose.connect(mongo.host)

module.exports = {
    mongoose,
    AutoIncrement
};
