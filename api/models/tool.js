const mongoose = require('mongoose');

const toolSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true},
    tags: { type: Array, required: true}
});

module.exports = mongoose.model('Tool', toolSchema);