import React, { useEffect, useLayoutEffect } from 'react'; 
import { render } from 'react-dom';
import {useState} from 'react'
import _ from './style.css'
import Header from './header'
import axios from 'axios'
import {CreatePost} from './Forms'
window.React = React


const Post = ({title,author,date,text,id}) => {
    return (<div className="post">
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{text}</p>
        <p>Posted on: {date}</p>
        <button onClick={() => {
            console.log(id);
            axios.post('/delete_post/' + id);
        }}>delete</button>
    </div>)
}

const isLoggedIn = async () => {
    try {
        const response = await axios.get('http://localhost:3000/is_logged');
        return response.data;
    } catch (err) {
        return false;
    }
}

const getPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/posts');
        return response.data;
    } catch (err) {
        return err;
    }
}


const App = () => {
    const [posts,setPosts] = useState([])
    const [isLogged,setIsLogged] = useState(false);

    useEffect(() => {
        async function getLoggedIn() {
            const getLogin = await isLoggedIn();
            setIsLogged(getLogin);

            if (getLogin) {
                getPosts()
                .then(postsOfUser => {
                    console.log(postsOfUser);
                    if (!postsOfUser.err) {
                        setPosts(postsOfUser.posts);
                    }
                })
            }
        };
        getLoggedIn();
    },[]);

    

    return (
        <>
            <Header isLogged={isLogged}/>
            {isLogged && <div class="posts">
                <CreatePost />
                {posts.map(post => {
                    return <Post title={post.title} date={post.date.slice(0,10)} text={post.text} id={post.id}/>
                })}
            </div>}
        </>
    )
}

render(<App />,document.getElementById('root'))