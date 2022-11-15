const router = require('express').Router();
const MessageModel = require('../models/message.model.js');


let i=0;
router.post("/send", async (req, res) => {
    let message = req.body;
    try {
        await MessageModel.create(message);
        res.status(200).send({result:"Successfully got Response"})
    }
    catch (err) {
        console.log("erreur");
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