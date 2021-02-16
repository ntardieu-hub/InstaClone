const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: String,
    like: String
})

likeSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Like', likeSchema);