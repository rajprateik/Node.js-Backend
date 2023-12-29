const mongoose = require("mongoose");
const Form = mongoose.model("Form");
const fs = require("fs");
const path = require("path");

exports.CreateForm = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ msg: "Please include all fields" });
  }

  let statusCode = 200;
  let response = {
    status: true,
    successMessage: "",
    errorMessage: "",
    error: null,
  };
  const form = new Form({
    title,
    description,
    img: fs.readFileSync(
      path.join(__dirname + "/../uploads/" + req.file.filename)
    ),
  });

  form
    .save()
    .catch((err) => {
      response.errorMessage = "Error";
    })
    .then((e) => {
      //     console.log("response", response);
      if (e._id) {
        response.data = e._id;
        response.successMessage = "Created";
      } else {
        response.errorMessage = "Error";
      }
    })
    .finally(() => {
      res.status(statusCode).json(response);
    });
};

exports.DeleteForm = (req, res) => {
  const { id } = req.body;
  console.log("ID", id);
  if (!id) {
    return res.status(400).json({ msg: "missing id" });
  }

  let statusCode = 200;
  let response = {
    status: true,
    successMessage: "",
    errorMessage: "",
    error: null,
  };

  Form.findByIdAndDelete(id)
    .catch((err) => {
      response.errorMessage = "Error";
    })
    .then((e) => {
      console.log("response", response);
      // if (e._id) {
      //   response.data = e._id;
      //   response.successMessage = "Created";
      // } else {
      //   response.errorMessage = "Error";
      // }
    })
    .finally(() => {
      res.status(statusCode).json(response);
    });
};
