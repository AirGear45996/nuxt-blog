const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Post = require('../models/post.model');
const Comments = require('../models/comment.model');

module.exports.create = async (req,res) => {
    console.log('req: ', req.file);
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        imageUrl: `/${req.file.filename}`
    });
    try {
        await post.save();
        res.status(201).json(post); // .status(201)
    } catch (e) {
        res.status(500).json(e); // .status(500)
    }
};
module.exports.getAll = async (req,res) => {
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (e) {
        res.status(500).json(e);
    }
};
module.exports.getById = async (req,res) => {
    try {
        /*const post = await Post.findById(req.params.id).populate('comments').exec((error,post) => {
            console.log('error: ', error);
            console.log('post: ', post);
        });*/
        const post = await Post.findById(req.params.id);
        post.comments = await Comments.find({postId: req.params.id});

        res.json(post);
    } catch (e) {
        res.status(500).json(e);
    }
};
module.exports.update = async (req,res) => {
    try {

        const $set = {
            text: req.body.text
        };

        const post = await Post.findOneAndUpdate({_id: req.params.id}, $set , { new: true }, (err, player) => {
            //console.log('err: ', err);
            //console.log('player: ', player);
        });
        
        res.json(post);
    } catch (e) {
        res.status(500).json(e);
    }
};
module.exports.delete = async (req,res) => {
    try {
        await Post.deleteOne({_id: req.params.id});
        res.json({ message: 'Пост удалён' });
    } catch (e) {
        res.json(e); // .status(500)
    }
};
module.exports.addView = async (req,res) => {
    const $set = {
        views: req.body.views,
    };
    try {
        await Post.findOneAndUpdate({_id: req.params.id}, $set);
        res.json();
    } catch (e) {
        res.status(500).json(e);
    }
};
module.exports.getAnalytics = async (req,res) => {
    try {
        const posts = await Post.find();

        const labels = posts.map(post => post.title);

        const json = {
            comments: {
                labels,
                data: posts.map(post => post.comments.length)
            },
            views: {
                labels,
                data: posts.map(post => post.views)
            },
        };

        res.json(json);
    } catch (e) {
        res.status(500).json(e);
    }
};