import { useState } from "react";
//components:
import Login from "../auth/login/Login";
import Logout from "../auth/logout/Logout";
import SearchBar from "../searchBar/SearchBar";
import SearchResults from "../searchResults/SearchResults";
import Playlist from "../playlist/Playlist";
import NavigationBar from "../nav/NavigationBar";
import Track from "../track/Track";
//styles:
import "./App.css";
//mock data - in place of an API call:
import { SIMPLE_DATA } from "../../mockData";
//------------------------------------//

function App() {
  const [login, setLogin] = useState(false);
  const [musicData, setMusicData] = useState(SIMPLE_DATA);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <>
      <Logout setLogin={setLogin} />
      <h1>Jammming</h1>
      <SearchBar setData={setMusicData} />
      <SearchResults musicData={musicData} setPlaylist={setPlaylist} />
      <Playlist playlist={playlist} />
      <Track
        playlist={playlist}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
      <NavigationBar />
    </>
  );
}

export default App;
