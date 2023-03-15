const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
    title: String,
    post: String,
})

module.exports = mongoose.model("Journal", journalSchema);