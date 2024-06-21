//importing all the necessary modules that are required.
const mongoose = require('mongoose');



// this sechema is for inventory collection.
const inventorySchema = new mongoose.Schema({
    medicine_name: {
        type: String
    },
    available_quantity: {
        type: Number
    },
   

});

const inventory = new mongoose.model("inventory",inventorySchema);

//exporting the inventory so that it can be used outside .
module.exports = inventory;