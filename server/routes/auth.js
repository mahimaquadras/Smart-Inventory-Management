// const router = require("express").Router();
// const {User} = require("../models/user");
// const Joi = require("joi");
// const bcrypt = require("bcrypt");

// router.post("/", async(req, res) => {
//     try {
//         const{error} = validate(req.body);
//         if(error)
//           return res.status(400).send({messsage: error.details[0].message});
//         console.log("11")

//         const user = await User.findOne({email: req.body.email});
//         if (!user)
//           return res.status(401).send({message: "Invalid Email or Password"});
//         console.log(user);

//         const validPassword = await bcrypt.compare(
//             req.body.password, user.password
//         );
//         if (!validPassword)
//           return res.status(401).send({message: "Invalid Email or Password"});
//         console.log(validPassword);

//           const token = user.generateAuthToken();
//           console.log(token);
//           res.status(200).send({ data: token, message: "logged in successfully" });
//         } catch (error) {
//           console.log(error);
//           res.status(500).send({ message: "Internal Server Error" });
          
//         }
//       });

// const validate = (data) => {
//     const Schema = Joi.object({
//         email: Joi.string().email().required().label("Email"),
//         password: Joi.string().required().label("Password")
//     });
//     return Schema.validate(data);
// }
// module.exports = router;


const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    // Compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    // Generate the authentication token
    const token = user.generateAuthToken();

    // Send the token and role back to the client
    res.status(200).send({ token: token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = router;
