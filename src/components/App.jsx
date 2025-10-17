import { useState } from "react";
import "../styles/modules/App.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";

//importing mock data - in place of an API call:
import { SIMPLE_DATA } from "../mockData";

function App() {
  const [musicData, setMusicData] = useState(SIMPLE_DATA)
  const [playlist, setPlaylist] = useState([])


  return (
    <>
      <h1>Jammming</h1>
      <SearchBar setData={setMusicData}/>
      <SearchResults musicData={musicData} setPlaylist={setPlaylist} />
      {/* Done */}
      <Playlist playlist={playlist}/>  

      <nav>
        <button>Home</button>
        <button>Explore</button>
        <button>Profile</button>
      </nav>
    </>
  );
}

export default App;
