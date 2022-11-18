const router = require("express").Router();
const MessageModel = require("../models/message.model.js");
const UserModel = require("../models/user.model.js");
const dataset = require("../dataset.json");

router.get("/init", async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (users.length !== 0) {
      res.sendStatus(200);
      return;
    }
    await UserModel.create(dataset);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
});

router.post("/", async (req, res) => {
  try {
    let users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await UserModel.findOne(req.body);
    if(!user){
      res.send({err: "User not found"});
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.send({err: "User not found"});
  }
});
router.post("/fetch-by-name", async (req, res) => {
  try {
    let users = await UserModel.findOne(req.body);
    res.send(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.post("/friends", async (req, res) => {
  try {
    const { id } = req.body;
    let user = await UserModel.findById(id);
    if (user.friends.length === 0) res.status(500).json({ err: err });

    let friends = await Promise.all(
      user.friends.map(async (friendId) => {
        let friend = await UserModel.findById(friendId);
        let lastMessage = await MessageModel.find({
          $or: [
            { from: id, to: friend._id },
            { from: friend._id, to: id },
          ],
        }).sort({ date: -1 });
        lastMessage = lastMessage[0];
        friend = { ...friend._doc, lastMessage };
        return friend;
      })
    );
    res.send(friends);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});
router.post("/favorites", async (req, res) => {
  try {
    const { id } = req.body;
    let user = await UserModel.findById(id);
    if (user.favorites.length === 0) res.status(500).json({ err: err });

    let favorites = await Promise.all(
      user.favorites.map(async (friendId) => {
        let friend = await UserModel.findById(friendId);
        let lastMessage = await MessageModel.find({
          $or: [
            { from: id, to: friend._id },
            { from: friend._id, to: id },
          ],
        }).sort({ date: -1 });
        lastMessage = lastMessage[0];
        friend = { ...friend._doc, lastMessage };
        return friend;
      })
    );
    res.send(favorites);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.post("/update-status", async (req, res) => {
  const { id, status } = req.body;
  try {
    let user = await UserModel.findOne({ id });
    user.status = { ...user.status, value: status };
    user.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

module.exports = router;
