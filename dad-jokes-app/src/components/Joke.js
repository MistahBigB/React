import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Joke() {

    //Define state variable, then function that sets or updates variable
    const [joke, setJoke] = useState('');

    // every time component mounts, it runs useEffect
    useEffect( () => {

        axios
        .get('https://icanhazdadjoke.com/', 
            {headers: {Accept: 'application/json'}})
        .then(res => setJoke(res.data))
        .catch(err => console.log(err))
    }, []);

    const fetchJoke = () => {
        axios
        .get('https://icanhazdadjoke.com/', 
            {headers: {Accept: 'application/json'}})
        .then(res => setJoke(res.data))
        .catch(err => console.log(err))
    }

    return (
		<div className="mt-4">
			<div className="card">
				<h5 className="card-header">Dad Joke</h5>
				<div className="card-body">
					<p className="card-text">{joke.joke}</p>
					<a className="btn btn-primary text-white" onClick={fetchJoke}>
						Get Another Joke
					</a>
				</div>
			</div>
		</div>
    );
}