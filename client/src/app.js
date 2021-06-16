import React, { useEffect, useLayoutEffect } from 'react'; 
import { render } from 'react-dom';
import {useState} from 'react'
import _ from './style.css'
import Header from './header'
window.React = React


const Post = ({title,author,date,text}) => {
    console.log({title,author,date,text});
    return (<div className="post">
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{text}</p>
        <p>Posted on: {date}</p>
    </div>)
}

const CreatePost = ({addPost}) => {

    const [author,setAuthor] = useState('')
    const [text,setText] = useState('')
    const [title,setTitle] = useState('')

    return (
        <form className="post" onSubmit={(e) => addPost(e,title,text,author)}>
            <h2>Создать пост</h2>
            <div className="form-control">
                <label for="title">Название</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label for="author">Автор</label>
                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label for="text">Текст</label>
                <textarea type="text" id="text" rows="10" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button type="submit">Постнуть</button>
        </form>
    )
}




const App = () => {
    const [posts,setPosts] = useState([])
    const addPost = (e,title,text,author) => {
        e.preventDefault();
        const newPosts = [...posts, {title,text,author}];
        setPosts(newPosts)
    }
    return (
        <>
            <Header />
            <div class="posts">
                <CreatePost addPost={addPost}/>
                {posts.map(post => {
                    return <Post title={post.title} author={post.author} date={new Date().toDateString()} text={post.text}/>
                })}
            </div>
        </>
    )
}

render(<App />,document.getElementById('root'))