const mongoose = require('mongoose');

function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Could not connect to database", error);
        process.exit(1); 
    }
};
