const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const detailsController = require("../Controllers/Details-controllers");
const checkAuth = require("../middleware/check-auth");
const fileUpload = require("../middleware/file-upload");


router.get("/details", detailsController.getDetails);
router.get("/detail/One", detailsController.getDetailsOne);
router.use(checkAuth)
router.post(
  "/details",fileUpload.single("image"),
  [
    check("mission").isLength({ min: 5 }),
    check("vision").isLength({ min: 5 }),
    check("description").isLength({ min: 5 }),
    check("awards").notEmpty(),
    check("classes").notEmpty(),
    check("classNumber").notEmpty(),
    check("studentNumber").notEmpty(),
  ],
  detailsController.createDetails
);
router.patch("/details",fileUpload.single("image"), [
    check("mission").isLength({ min: 5 }),
    check("vision").isLength({ min: 5 }),
    check("description").isLength({ min: 5 }),
    check("awards").notEmpty(),
    check("classes").notEmpty(),
    check("classNumber").notEmpty(),
    check("studentNumber").notEmpty(),
  ],detailsController.updateDetails);
router.delete("/details", detailsController.deleteDetails);
module.exports = router;
