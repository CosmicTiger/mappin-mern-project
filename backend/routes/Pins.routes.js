const router = require('express').Router();
const PinModel = require("../models/Pin.model");

// Create a Pin
router.post('/', async (req, res) => {
    const newPin = new PinModel(req.body);

    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Pins
router.get('/', async (_, res) => {
    try {
        const pins = await PinModel.find();
        res.status(200).json(pins);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
