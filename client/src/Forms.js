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