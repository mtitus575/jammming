//My DEBUG function:
const DEBUG = true;
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
    let tokenTimeout;

    if (!storedToken) {
      debugLog("No token found - fetching from API...");
      async function getToken() {
        const clientId = "81fc5b4147ae49498e7fd9822ffbb160";
        const clientSecret = "064bc6a7463349c9a37627361c3b4038";
        const tokenData = await APIcalls.getSpotifyToken(
          clientId,
          clientSecret
        );

        //Store token with a timestamp:
        const tokenWithTimestamp = {
          ...tokenData,
          created_at: Date.now(),
        };

        localStorage.setItem("token", JSON.stringify(tokenWithTimestamp));
        setApiToken(tokenData.access_token);
        debugLog("Token fetched and set from API");

        //Set timeout for new token
        if (tokenData.expires_in) {
          const expiryTime = tokenData.expires_in * 1000; //converts the time to milliseconds
          debugLog(`The token will expire in ${tokenData.expires_in} seconds`);

          tokenTimeout = setTimeout(() => {
            debugLog("Token expired - clearing from storage");
            localStorage.removeItem("token");
            setApiToken("");
          }, expiryTime);
        }
      }
      getToken();
    } else {
      debugLog("Token found in localStorage");
      try {
        const token = JSON.parse(storedToken);

        //Checking if the token is still valid:
        if (token.created_at && token.expires_in) {
          const timeElapsed = Date.now() - token.created_at;
          const timeRemaining = token.expires_in * 1000 - timeElapsed;

          if (timeRemaining > 0) {
            //The token is still valid - use it and set the timeout for the remaining time.
            setApiToken(token.access_token);
            debugLog(
              `Token loaded from localStorage: It expires in ${Math.round(
                timeRemaining / 1000
              )} seconds`
            );

            tokenTimeout = setTimeout(() => {
              debugLog("Stored token expired - clearing from storage");
              localStorage.removeItem("token");
              setApiToken("");
            }, timeRemaining);
          } else {
            //Token already expired - remove it and fetch
            debugLog("Stored token already expired - removing");
            localStorage.removeItem("token");
            setApiToken("");
          }
        } else {
          //old token format without timestamp - use as is and add a timeout
          if (token.expires_in) {
            const expiryTime = token.expires_in * 1000;
            tokenTimeout = setTimeout(() => {
              localStorage.removeItem("token");
              setApiToken("");
            }, expiryTime);
          }
        }
      } catch (error) {
        console.error("Invalid token in localStorage:", error);
        localStorage.removeItem("token");
      }
    }

    debugLog(`The token state is: ${apiToken}`);

    //CLEANUP: clear timeout when the component unmounts or effect re-runs:
    return () => {
      if (tokenTimeout) {
        debugLog("Clearing token timeout");
        clearTimeout(tokenTimeout);
      }
    };
  }, []);

  //fetch searchQuery data from the API:

  //---------------------------------------//
  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <>
      <Logout setLogin={setLogin} />
      <h1>Jammming</h1>
      <SearchBar setMusicData={setMusicData} apiToken={apiToken} />
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
