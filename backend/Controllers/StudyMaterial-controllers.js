const { validationResult } = require("express-validator");
const StudyMaterial = require("../models/StudyMaterial");
const HttpError = require("../models/http-error");

// Controller for adding a new file
const addFile = async (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please try again", 422));
  }

  // Get the file path from the request
  const file = req.file.path;

  // Create a new StudyMaterial document
  const addedFile = new StudyMaterial({
    file: file,
  });

  try {
    await addedFile.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, adding file failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ file: addedFile });
};

// Controller for fetching all files
const getFiles = async (req, res, next) => {
  let files;
  try {
    files = await StudyMaterial.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, fetching files failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ files: files });
};

// Controller for deleting a file by ID
const deleteFileById = async (req, res, next) => {
  const fileId = req.params.id;

  let file;
  try {
    file = await StudyMaterial.findById(fileId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the file, please try again",
      500
    );
    return next(error);
  }

  if (!file) {
    const error = new HttpError("File not found, please try again", 500);
    return next(error);
  }

  try {
    await file.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the file, please try again",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "The file was successfully deleted" });
};

module.exports = {
  addFile,
  getFiles,
  deleteFileById,
};
