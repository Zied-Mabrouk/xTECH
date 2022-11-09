const router = require('express').Router();
const MessageModel = require('../models/message.model.js');
const UserModel = require('../models/user.model.js');


router.get("/", async (req, res) => {

    try {

        let users = await UserModel.find({});
        res.send(users);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});

router.post("/fetch-by-name", async (req, res) => {

    try {

        let users = await UserModel.findOne(req.body);
        res.send(users);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});
router.post("/friends", async (req, res) => {

    try {
        const { id } = req.body;
        let user = await UserModel.findById(id);
        if (user.friends.length === 0)
            res.status(500).json({ err: err })

        let friends = await Promise.all(user.friends.map(async (friendId) => {
            let friend = await UserModel.findById(friendId);
            let lastMessage = await MessageModel
            .find({ $or: [{ from: id, to: friend._id }, { from: friend._id, to: id }] })
            .sort({ date: -1 });
            lastMessage = lastMessage[0];
            friend ={...friend._doc,lastMessage}
            return friend;
        }))
        res.send(friends);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});





module.exports = router;