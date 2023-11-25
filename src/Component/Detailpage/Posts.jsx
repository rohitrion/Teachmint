


import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import Timer from '../Clock/Timer';

const Popup = ({ post, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
                <h3>Title: {post.title}</h3>
                <p>
                    <b>Description</b>: <br />
                    {post.body}
                </p>
            </div>
        </div>
    );
};

const Posts = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const userAns = await userRes.json();
            setUser(userAns);
        };

        const fetchPosts = async () => {
            const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const postsAns = await postsRes.json();
            setPosts(postsAns);
        };

        fetchUser();
        fetchPosts();
    }, [id]);

    const openPostPopup = (post) => {
        setSelectedPost(post);
    };

    const closePostPopup = () => {
        setSelectedPost(null);
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="containerr">
            <Link to="/">
                <button>Back</button>{' '}
            </Link>
            <h2 className="heading">Profile Page</h2>

            <Timer />

            <div className="details">
                <div>
                    <h3 className="h">Name</h3>
                    <h3>{user.name}</h3>

                    <div className="semi">
                        <div>
                            <h3>UserName</h3>
                            <h3>{user.username}</h3>
                        </div>

                        <div>
                            <h3>Catch phrase</h3>
                            <h3>{user.company.catchPhrase}</h3>
                        </div>
                    </div>
                </div>

                <div className="dis">
                    <h3>Address</h3>
                    <div className="add">
                        <h3>{user.address.city}</h3> <h4>{user.address.suite}</h4>
                        <h4>{user.address.street}</h4> <h4>{user.address.zipcode}</h4>{' '}
                    </div>
                    <div className="semi">
                        <div>
                            <h3>Email</h3>
                            <h3>{user.email}</h3>
                        </div>

                        <div>
                            <h3>Number</h3>
                            <h3>{user.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="heading">Posts</h2>

            <div className="posts">
                {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="post" onClick={() => openPostPopup(post)}>

                        <h3>Title:{post.title}</h3>

                        <p><b>Description</b>:<br />{post.body}</p>
                    </div>
                ))}            </div>

            {selectedPost && <Popup post={selectedPost} onClose={closePostPopup} />}
        </div>
    );
};

export default Posts;
