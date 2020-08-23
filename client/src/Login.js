import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Gives us access to the history instance to navigate
    const history = useHistory();
    const formSubmit = (event) => {
        event.preventDefault();
        const formData = { username: userName, password };
        fetch(`http://localhost:1337/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <form onSubmit={formSubmit}>
            <TextField
                id="standard-full-width"
                label="UserName"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
            />
            <TextField
                id="standard-full-width"
                label="Password"
                type="password"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Login;