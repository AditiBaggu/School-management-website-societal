const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  file: { type: String, required: true },
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
