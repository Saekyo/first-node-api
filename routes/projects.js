const { Project } = require('../models/project');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    const projectList = await Project.find();

    if (!projectList) {
        res.status(500).json({ success: false });
    }
    res.send(projectList);
});

router.get(`/:id`, async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(500).json({ success: false });
    }
    res.send(project);
});

router.post(`/`, async (req, res) => {

    let project = new Project({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        tag: req.body.tag,
        link: req.body.link,
        isFeatured: req.body.isFeatured,
    });

    project = await Project.save();

    if (!project) {
        return res.status(500).send('The project cannot be created');
    }
    res.send(project);
});

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Project ID');
    }

    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        tag: req.body.tag,
        link: req.body.link,
        isFeatured: req.body.isFeatured,
        },
        { new: true }
    );

    if (!project) return res.status(500).send('The project cannot be created!');

    res.send(project);
});

router.delete(`/:id`, async (req, res) => {
    Project.findByIdAndRemove(req.params.id)
        .then((project) => {
            if (project) {
                return res.status(200).json({
                    success: true,
                    message: 'The project is deleted!',
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'project not found' });
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, error: err });
        });
});

module.exports = router;
