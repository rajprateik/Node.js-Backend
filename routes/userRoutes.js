const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");
const userRouter = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authmiddleware");
const userController = require("../controller/userController");

const upload = multer({ dest: "uploads/" });

userRouter.post(
  "/create-form",
  upload.single("file"),
  authMiddleware.authCheck,
  userController.CreateForm
);

userRouter.post(
  "/delete-form",
  authMiddleware.authCheck,
  userController.DeleteForm
);

module.exports = userRouter;
