import React from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

import "./styles/app.scss";

import data from "./data";

function App() {
    // useRef
    const audioRef = React.useRef(null);

    // State
    const [songs, setSongs] = React.useState(data());
    const [currentSong, setCurrentSong] = React.useState(songs[0]);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [libraryStatus, setLibraryStatus] = React.useState(false);

    return (
        <div className="App">
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
        </div>
    );
}

export default App;
