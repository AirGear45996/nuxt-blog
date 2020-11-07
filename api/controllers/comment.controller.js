const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');

module.exports.create = async (req,res) => {
    try {

        const { name, text, postId } = req.body;
        const comment = new CommentModel({ name, text, postId });
        await comment.save();

        //const post = new PostModel.findById(postId);
        //post.comments.push(comment._id);
        //await post.save();

        res.status(201).json(comment);

    } catch (e) {
        res.status(500).json(e);
    }
};