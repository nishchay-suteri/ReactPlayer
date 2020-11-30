import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import playAudio from "../utils";

const Player = (props) => {
    // extract props
    const {
        currentSong,
        isPlaying,
        setIsPlaying,
        audioRef,
        songs,
        setCurrentSong,
        setSongs,
    } = props;

    // Helper Functions
    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    // States
    const [songInfo, setSongInfo] = React.useState({
        currentTime: 0,
        duration: 0,
    });

    // event handlers
    const playSongHandler = (event) => {
        // console.log(audioRef);
        // console.log(audioRef.current);
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const updateTimeHandler = (event) => {
        // console.log(event.target.currentTime);
        // console.log(event.target.duration);
        setSongInfo({
            ...songInfo,
            currentTime: event.target.currentTime,
            duration: event.target.duration,
        });
    };

    const setSongHandler = async (song) => {
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

    const skipHandler = (option) => {
        const currentIndex = songs.findIndex((s) => {
            return s.id === currentSong.id;
        });
        const totalSongs = songs.length;
        let song;
        switch (option) {
            case "skip-back":
                song = songs[(currentIndex - 1 + totalSongs) % totalSongs];
                // setCurrentSong(
                // songs[(currentIndex - 1 + totalSongs) % totalSongs]
                // );
                break;
            case "skip-forward":
                // setCurrentSong(songs[(currentIndex + 1) % totalSongs]);
                song = songs[(currentIndex + 1) % totalSongs];
                break;
            default:
                return;
        }
        setSongHandler(song);
    };

    const dragHandler = (event) => {
        // console.log(event.target.value);
        audioRef.current.currentTime = event.target.value;
        setSongInfo({
            ...songInfo,
            currentTime: event.target.value,
        });
    };

    const songEndHandler = (event) => {
        const currentIndex = songs.findIndex((s) => {
            return s.id === currentSong.id;
        });
        const totalSongs = songs.length;
        setCurrentSong(songs[(currentIndex + 1) % totalSongs]);
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    type="range"
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    onClick={() => skipHandler("skip-back")}
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    onClick={() => skipHandler("skip-forward")}
                    icon={faAngleRight}
                />
            </div>
            <audio
                onTimeUpdate={updateTimeHandler}
                ref={audioRef}
                src={currentSong.audio}
                onLoadedMetadata={updateTimeHandler}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
};

export default Player;
