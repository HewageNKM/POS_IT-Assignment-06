const mongoose = require('mongoose');

async function setConnection() {
    const url = 'mongodb+srv://' + process.env.DB_USER_NAME + ':' + process.env.DB_PASSWORD + '@cluster.u1h0anr.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
    const connection = await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

    if (connection) {
        console.log("Connected to the Atlas Database");
    } else {
        console.log("Error in connecting to the Atlas Database");
    }
}

setConnection();
module.exports = mongoose;