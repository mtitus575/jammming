//My DEBUG function:
const DEBUG = false;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}

//Start of app:
import { useEffect, useState } from "react";
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
//API functions:
import { APIcalls } from "../../APICall";
//------------------------------------//

function App() {
  //State:
  const [login, setLogin] = useState(false);
  const [musicData, setMusicData] = useState(SIMPLE_DATA);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [apiToken, setApiToken] = useState("");

  //Get spotify Access Token:
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      debugLog("No token found - fetching from API...");
      async function getToken() {
        const clientId = "81fc5b4147ae49498e7fd9822ffbb160";
        const clientSecret = "064bc6a7463349c9a37627361c3b4038";
        const tokenData = await APIcalls.getSpotifyToken(
          clientId,
          clientSecret
        );

        localStorage.setItem("token", JSON.stringify(tokenData));
        setApiToken(tokenData.access_token);
        debugLog("Token fetched and set from API");
      }
      getToken();
    } else {
      debugLog("Token found in localStorage");
      try {
        const token = JSON.parse(storedToken);
        setApiToken(token.access_token);
        debugLog("Token loaded from localStorage");
      } catch (error) {
        console.error("Invalid token in localStorage:", error);
        localStorage.removeItem("token");
      }
    }

    debugLog(`The token state is: ${apiToken}`)

    //add a return function here that will remove the API token from localStorage after the expiry time
  }, [apiToken]);

  //fetch searchQuery data from the API:


  //---------------------------------------//
  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <>
      <Logout setLogin={setLogin} />
      <h1>Jammming</h1>
      <SearchBar setMusicData={setMusicData} apiToken={apiToken}/>
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
