
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
//Styles
import "./styles/app.scss";
//components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//data
import data from "./data.js"
import Nav from "./components/Nav";

function App() {
  //const
  //Ref
  const audioRef = useRef(null);
  useEffect(()=>{
    fetchData();
  },[]);
  async function fetchData(){
    try{
      const result = await axios.get('https://localhost:44348/api/Ingredient')
      console.log(result.data);
    }catch(error){
      console.log(error);
    }
  }

  //State
  const[songs,setSongs] = useState(data());
  const[currentSong,setCurrentSong] = useState(songs[0]);
  const[isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime: current,duration: duration});
  }
  const [libraryStatus,setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} 
      audioRef={audioRef} 
      timeUpdateHandler={timeUpdateHandler}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus}/>
      <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            ref={audioRef} 
            src={currentSong.audio}/>
    </div>
  );
}

export default App;
