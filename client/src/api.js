const API_URL = 'http://localhost:5000';

export const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
};

export const addPost = async (post) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};

export const updatePost = async (id, post) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return response.json();
};
