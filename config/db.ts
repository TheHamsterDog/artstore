const mongoose = require('mongoose');

const connect = async (uri) => {
    try {
        const connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to the database!!!");
    }
    catch (err) {
        console.log(`Can't connect to the mongoose server: ${err.message}`);
    }
}

export default connect;