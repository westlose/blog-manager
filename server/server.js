const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blog-manager');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedPost);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
