import React, { useState, useEffect } from 'react';
import { getPosts, addPost, deletePost, updatePost } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState({ title: '', content: '' });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const posts = await getPosts();
            setPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditContent({ ...editContent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost(newPost);
            fetchPosts();
            setNewPost({ title: '', content: '', author: '' });
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const handleEditPost = (post) => {
        setEditingPostId(post._id);
        setEditContent({ title: post.title, content: post.content });
    };

    const handleUpdatePost = async (id) => {
        try {
            await updatePost(id, editContent);
            setEditingPostId(null);
            fetchPosts();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Blog Manager</h1>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                        value={newPost.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="content"
                        className="form-control"
                        placeholder="Content"
                        rows="5"
                        value={newPost.content}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        placeholder="Author"
                        value={newPost.author}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Post
                </button>
            </form>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-4 mb-4" key={post._id}>
                        <div className="card">
                            <div className="card-body">
                                {editingPostId === post._id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control mb-2"
                                            value={editContent.title}
                                            onChange={handleEditInputChange}
                                        />
                                        <textarea
                                            name="content"
                                            className="form-control mb-2"
                                            rows="5"
                                            value={editContent.content}
                                            onChange={handleEditInputChange}
                                        />
                                        <button onClick={() => handleUpdatePost(post._id)} className="btn btn-primary">
                                            Update
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                        <p className="card-text"><small className="text-muted">Author: {post.author}</small></p>
                                        <p className="card-text"><small className="text-muted">Date: {new Date(post.date).toLocaleString()}</small></p>
                                        <button onClick={() => handleEditPost(post)} className="btn btn-secondary mr-2">Edit</button>
                                        <button onClick={() => handleDeletePost(post._id)} className="btn btn-danger">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
