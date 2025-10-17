import { useState } from "react";
import "../styles/modules/App.css";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import NavigationBar from "./navBtns/NavigationBar";

//importing mock data - in place of an API call:
import { SIMPLE_DATA } from "../mockData";

function App() {
  const [musicData, setMusicData] = useState(SIMPLE_DATA);
  const [playlist, setPlaylist] = useState([]);

  return (
    <>
      <h1>Jammming</h1>
      <SearchBar setData={setMusicData} />
      <SearchResults musicData={musicData} setPlaylist={setPlaylist} />
      <Playlist playlist={playlist} />

      {/* Done */}
      <NavigationBar />
    </>
  );
}

export default App;
