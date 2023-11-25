import React, { useEffect, useState } from 'react'
import "./style.css";
import { Link } from 'react-router-dom';
const Home = () => {

    const [post, setpost] = useState([])

    const [userpost, setuserposts] = useState({})

    async function Api() {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        const res = await data.json();
        setpost(res)

    }


    useEffect(() => {

        post.forEach((user) => {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then((res) => res.json())
                .then((posts) => {
                    setuserposts((Allpost) => ({
                        ...Allpost,
                        [user.id]: posts.length
                    }))

                })

        })


    }, [post])



    useEffect(() => {
        Api()
    }, [])

    return (
        <div className="container">
            <h2 className='heading'>Directory</h2>
            {/* <h2>Users and Their Posts</h2> */}
            <div className="user-list">
            
                {post.map((user) => (
                        <Link to={`/post/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}  >
                    <div key={user.id} className="user-item">
                        <div className="user-info">
                            <strong>{user.name}</strong>
                        </div>
                        <div className="post-info">
                            {userpost[user.id] || 0} posts
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home