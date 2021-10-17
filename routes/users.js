const express = require("express");
const User = require("../models/User")
// create a new instance of express router
const router = express.Router();

// creating new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

// getting all users
router.get("/", async(req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

// getting one user
router.get("/:id",getUser, async(req, res)=>{
  res.json(res.user);
})

// deleting one user
router.delete('/:id', getUser, async(req, res) =>{
  try {
    await res.user.remove()
    res.json({message: "Deleted user"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})
// updating one user
router.patch("/:id", getUser, async(req, res)=>{
  if (req.body.name != null){
    res.user.name = req.body.name
  }
  if (req.body.password != null){
    res.user.password = req.body.password;
  }
  try {
   const updatedUser = await res.user.save();
   res.json(updatedUser);
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})
// middleware
async function getUser(req, res, next){
  let user
  try {
    user = await User.findById(req.params.id);
    if (user == null){
      return res.status(404).json({message:"Cannot find user"})
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
  res.user = user;
  next();}

module.exports = router;