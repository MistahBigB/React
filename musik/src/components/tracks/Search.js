import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }

    findTrack = (dispatch, e) => {
        e.preventDefault();
        //gets past that pesky CORS
        axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&
        apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });
            // clears search field after search completed
            this.setState({ trackTitle: '' })
        })
        .catch(err => console.log(err));
    };

    onChange = e => {
        //Looks at input: name field
        this.setState({ [e.target.name]: e.target.value});
    };

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className='card card-body mb-4 p-4'>
                            <h1 className='display-4 text-center'>
                                <i className='fas fa-music'></i>Search for a Song
                            </h1>
                            <p className='lead text-center'>Get 1/3 of the lyrics to any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className='form-group'>
                                   <input 
                                   type='text' 
                                   className='form-control form-control-lg'
                                   placeholder='What song are you looking for?'
                                   name='trackTitle'
                                   value={this.state.trackTitle}
                                   onChange={this.onChange }/> 
                                </div>
                                <button 
                                className='btn btn-primary btn-lg btn-block mb-5'
                                type='submit'>
                                    Get Track
                            </button>
                            </form>
 
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;