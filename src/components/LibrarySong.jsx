import React from "react";
import playAudio from "../utils";

const LibrarySong = ({
    song,
    setCurrentSong,
    isPlaying,
    audioRef,
    songs,
    setSongs,
}) => {
    const setSongHandler = async (event) => {
        setCurrentSong(song);
        const newSongs = songs.map((s) => {
            if (s.id === song.id) {
                return {
                    ...s,
                    active: true,
                };
            } else {
                return {
                    ...s,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        playAudio(isPlaying, audioRef);
    };
    return (
        <div
            onClick={setSongHandler}
            className={`library-song ${song.active ? "selected" : ""}`}
        >
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
