import React, { useEffect } from "react";

const LibrarySong = ({songs, setCurrentSong, song, key, audioRef, isPlaying, setSongs}) => {
    //active state

        const newSongs = songs.map((s) => {
            if(s.id === song.id){
                return{
                    ...s,
                    active: true,
                };
            }
            else{
                return{
                    ...s,
                    active: false,
                };
            }
        });

    //selector
    const songSelectHandler = () => {
        setCurrentSong(song);
        if(isPlaying){
            audioRef.current.play();
        };
        setSongs(newSongs);
    };

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : "" }`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;