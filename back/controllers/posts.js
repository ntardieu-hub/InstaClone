const postsRouter = require('express').Router();
const Post = require('../models/post');
const Like = require('../models/like')

postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const post = new Post(req.body)
        const savedPost = post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
});

postsRouter.get('/like', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const likes = await Like.find({});
        req.io.emit('UPDATE', likes);
        return res.json(likes.map((like => like.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/like', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const isSave = await Like.findOne({ user: req.body.userId, like: req.body.post}).exec();
        // ajout d'un favorie
        if(isSave === null){
            const like = new Like({user: req.body.userId, like : req.body.post})
            const savedLike = like.save()
            const likes = await Like.find({});
            req.io.emit('UPDATE', likes);
            return res.status(201).json(savedLike);
        // suppression d'un favorie
        } else {
            await Like.findOneAndDelete({ user: req.body.userId, like: req.body.post}).exec();
            return res.status(201);
        }
        
    }
    return res.status(403).send('Not authorized')
});

module.exports = postsRouter;