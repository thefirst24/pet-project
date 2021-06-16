import { useState } from "react"


export const LoginForm = () => {
    return (
        <form className="modal" method="post" action="/login">
            <h3 className="modal-title">Login</h3>
            <hr></hr>
            <div className="modal-body">
            <div className="form-control">
                <label>Username </label>
                <input type="text" name="username"></input>
            </div>
            <div className="form-control">
                <label>Password </label>
                <input type="password" name="password"></input>
            </div>
            </div>
            <hr></hr>
            <div className="modal-footer">
                <button type="submit">Sign in</button>
            </div>
        </form>
    )
}

export const RegisterForm = () => {
    return (
        <form className="modal" method="post" action="/register">
            <h3 className="modal-title">Register</h3>
            <hr></hr>
            <div className="modal-body">
                <div className="form-control">
                    <label>Username </label>
                    <input type="text" name="username"></input>
                </div>
                <div className="form-control">
                    <label>Password </label>
                    <input type="password" name="password"></input>
                </div>
            </div>
            <hr></hr>
            <div className="modal-footer">
                <button type="submit">Sign in</button>
            </div>
        </form>
    )
}

export const CreatePost = ({addPost}) => {

    const [text,setText] = useState('')
    const [title,setTitle] = useState('')

    return (
        <form method="post" action="/add_post" className="post">
            <h2>Создать пост</h2>
            <div className="form-control">
                <label for="title">Название</label>
                <input name="title" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label for="text">Текст</label>
                <textarea name="text" type="text" id="text" rows="10" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button type="submit">Постнуть</button>
        </form>
    )
}