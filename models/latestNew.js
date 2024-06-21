//importing all the necessary modules that are required.
const mongoose = require('mongoose');


//this collection is used for news collections.
const newsSchema = new mongoose.Schema(
    {
        date: {
            required: true,
            type : String
        },
        news: {
            required: true,  // required: true means its a necessary field.
            type : String
        }
    },
        {
            timestamps: true // this is done to automatically create createdAt and updatedAt field.
        }
);  

const newstable = new mongoose.model("latestnews",newsSchema);

// exporting the news table so that it can use outside the table.
module.exports = newstable;