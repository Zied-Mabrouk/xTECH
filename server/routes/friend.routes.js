const router = require('express').Router();
const FriendModel = require('../models/friend.model.js');





router.get("/", async (req, res) => {

    try {

        let friends = await FriendModel.find({});
        res.send(friends);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});





module.exports = router;