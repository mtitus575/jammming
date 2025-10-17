import { useState } from "react";
import "../styles/modules/App.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import NavigationBar from "./navBtns/NavigationBar";
import Track from "../components/Track";

//importing mock data - in place of an API call:
import { SIMPLE_DATA } from "../mockData";

function App() {
  const [musicData, setMusicData] = useState(SIMPLE_DATA);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <>
      <h1>Jammming</h1>
      <SearchBar setData={setMusicData} />
      <SearchResults musicData={musicData} setPlaylist={setPlaylist} />
      <Playlist playlist={playlist} />
      <Track playlist={playlist} currentTrack={currentTrack} />
      <NavigationBar />
    </>
  );
}

export default App;
