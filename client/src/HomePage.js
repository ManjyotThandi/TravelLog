import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";

function HomePage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();
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

export default HomePage;