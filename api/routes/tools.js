const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tool = require('../models/tool');


 router.get('/', async (req, res, next) => {
    try{
        const response = await Tool.find().exec();
        const tools = response.map(tool => {
            return {
                id: tool._id,
                title: tool.title,
                link: tool.link,
                description: tool.description,
                tags: tool.tags
            };
        });
        res.status(200).json(tools);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    };
});

router.post('/', async (req, res, next) => {
    const tool = new Tool({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        tags: req.body.tags
    });
    try {
        const response = await tool.save();
        res.status(201).json({
                id: response._id,
                title: response.title,
                link: response.link,
                description: response.description,
                tags: response.tags
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    };
});

router.get('/:toolId', async (req, res, next) => {
    const id = req.params.toolId;
    try{
        const response = await Tool.findById(id).select('_id title link description tags').exec();
        if(response) {
            res.status(200).json({
                product: {
                id: response._id,
                title: response.title,
                link: response.link,
                description: response.description,
                tags: response.tags
                }
            });
        } else {
            res.status(404).json({
                message: "No valid entry found for provited ID"
            })
        };
    } catch (err) {
        res.status(500).json({
            error: err
        });
    };
});
  
router.patch('/:toolId', async (req, res, next) => {
    const id = req.params.toolId;
    const updateProp = {};
    for (const prop of req.body) {
        updateProp[prop.propName] = prop.value;
    }
    try {
        await Tool.updateOne({ _id: id }, { $set: updateProp});
        res.status(200).json({
            message: 'Product updated'
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
    };
});

router.delete('/:toolId', async (req, res, next) => {
    const id = req.params.toolId;
    try{
        const response = await Tool.remove({ _id: id }).exec();
        res.status(204).json({
            message: 'Product deleted'
        });

    } catch (err) {
        res.status(500).json({
            error: err
        });
    };

});

module.exports = router;

