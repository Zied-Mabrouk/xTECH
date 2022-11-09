const router = require('express').Router();
const MessageModel = require('../models/message.model.js');



router.post("/send", async (req, res) => {

    try {
        await MessageModel.create(req.body);
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});
router.post("/get-conversation", async (req, res) => {
    const { from, to } = req.body;
    try {

        const conversation = await MessageModel.find({ $or: [{ from, to }, { from: to, to: from }] })
        conversation.sort((a, b) => a.date -b.date);
        res.send(conversation);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
});




module.exports = router;