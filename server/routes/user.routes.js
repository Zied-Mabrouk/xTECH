const router = require('express').Router();
const MessageModel = require('../models/message.model.js');
const UserModel = require('../models/user.model.js');
const dataset = require('../dataset.json');


router.get("/init", async (req, res) => {

    try {

        const users = await UserModel.find({});
        if (users.length !== 0) return;
            await UserModel.create(dataset);

    }
    catch (err) {
        console.log(err);
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
            friend = { ...friend._doc, lastMessage }
            return friend;
        }))
        res.send(friends);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});
router.post("/favorites", async (req, res) => {
    try {
        const { id } = req.body;
        let user = await UserModel.findById(id);
        if (user.favorites.length === 0)
            res.status(500).json({ err: err })

        let favorites = await Promise.all(user.favorites.map(async (friendId) => {
            let friend = await UserModel.findById(friendId);
            let lastMessage = await MessageModel
                .find({ $or: [{ from: id, to: friend._id }, { from: friend._id, to: id }] })
                .sort({ date: -1 });
            lastMessage = lastMessage[0];
            friend = { ...friend._doc, lastMessage }
            return friend;
        }))
        res.send(favorites);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});





module.exports = router;