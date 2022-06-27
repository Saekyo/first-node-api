const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    images: [
        {
            type: String,
            default: '',
        },
    ],
    link: {
        type: String,
        default: '',
    },
    tag: {
        type: String,
        default: '',
    },
    tags: [
        {
            type: String,
            default: '',
        },
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

exports.Project = mongoose.model('Project', projectSchema)
