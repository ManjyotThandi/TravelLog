import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from './API';

const LogEntryForm = (props) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // add the lat and long to the data object being passed in
        data.latitude = props.location.latitude
        data.longitude = props.location.longitude

        try {
            // in order to let the user know that the request is loading
            setLoading(true);
            const created = await createLogEntry(data);
        }
        catch (error) {
            // Let the user know of the error
            setError(error.message);
        }

        setLoading(false);
        // calls parent function which updates state (to hide popup), and call on API to get all entries again (essentially refreshing)
        props.onClose();
    }

    return (
        <>
            {error && (<h3 className="error">{error}</h3>)}
            <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Title</label>
                <input name="title" required ref={register} />
                <label htmlFor="comments">Comments</label>
                <textarea name="comments" rows={3} ref={register} />
                <label htmlFor="description">Description</label>
                <textarea name="description" rows={3} ref={register} />
                <label htmlFor="image">Image</label>
                <input name="image" ref={register} />
                <label htmlFor="visitDate">Visit Date</label>
                <input name="visitDate" type="date" ref={register} />
                <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
            </form>
        </>
    )
}

export default LogEntryForm;