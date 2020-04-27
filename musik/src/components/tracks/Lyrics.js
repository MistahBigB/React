import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment'; 

//data only necessary for this particular component
// doesnt need to be at application level
class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount() {
        //gets past that pesky CORS
        axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&
        apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            // console.log(res.data)
            this.setState({lyrics: res.data.message.body.lyrics});

            return axios.get(
                `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&
                apikey=${process.env.REACT_APP_MM_KEY}`);
        })
        .then(res => {
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.log(err));
    }
    render() {
        console.log(this.state)
        const { track, lyrics } = this.state;
        // If an object has no keys, it's likely empty
        if (
            track === undefined || 
            lyrics === undefined || 
            Object.keys(track).length === 0 || 
            Object.keys(lyrics).length === 0 
            ) {
                return <h1>Loading</h1>
            } else {
                return (
                    <React.Fragment>
                        <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
                        <div className='card'>
                            <h5 className='card-header'>
                                {track.track_name} by {' '}<span className='text-secondary'>{track.artist_name}</span>
                            </h5>
                            <div className='card-body'>
                                    {lyrics.lyrics_body.split('\n').map(lyric => {
                                        return <p className="card-text">{lyric}</p>
                            })}    
                            </div>
                        </div>

                        <ul className='list-group mt-3'>
                            <li className='list-group-item'>
                                <strong>Album ID</strong>: {track.album_id}
                            </li>
                            {/* Not all tracks have genre info */}
                            <li className='list-group-item'>
                                <strong>Genre</strong>: {track.primary_genres.music_genre_list.length !== 0
                                ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : 'N/A'}
                            </li>
                            <li className='list-group-item'>
                                <strong>Release Date</strong>: <Moment format='MM/DD/YYYY'>
                                    {track.updated_time.length !== 0
                                    ? track.updated_time : 'N/A'}</Moment>
                            </li>
                        </ul>    
                    </React.Fragment>
                )
            }
    }
}

export default Lyrics;