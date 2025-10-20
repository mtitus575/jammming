//My DEBUG function:
const DEBUG = false;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

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
import { KEYS } from "../../../private";
//------------------------------------//

function App() {
  //State:
  const [login, setLogin] = useState(true);
  const [musicData, setMusicData] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [apiToken, setApiToken] = useState("");

  // NEW STATE for user authentication (added for playlist saving)
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  //REMOVE: only here during the build process.
  if (musicData.length > 3) {
    debugLog(`musicData state updated in the App Component:`, musicData);
  }

  //Get spotify Access Token:
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    let tokenTimeout;

    if (!storedToken) {
      debugLog("No token found - fetching from API...");
      async function getToken() {
        const clientId = KEYS.clientId;
        const clientSecret = KEYS.clientSecret;
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

  // NEW useEffect for user authentication (for playlist saving)
  useEffect(() => {
    const handleUserAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code && !isUserAuthenticated && !userToken) {
        try {
          debugLog("User authorization code found, getting token...");
          const clientId = KEYS.clientId;

          // Clean URL immediately to prevent re-processing
          window.history.replaceState({}, document.title, "/");

          const tokenData = await APIcalls.getUserAccessToken(clientId, code);
          debugLog("User token received:", !!tokenData.access_token);

          setUserToken(tokenData.access_token);

          const userProfile = await APIcalls.getCurrentUser(
            tokenData.access_token
          );
          setUser(userProfile);
          setIsUserAuthenticated(true);

          debugLog("User authenticated:", userProfile.display_name);
        } catch (error) {
          debugLog("User authentication failed:", error);
        }
      }
    };

    handleUserAuth();
  }, [isUserAuthenticated, userToken]);

  // Function to start user login
  const handleSpotifyLogin = async () => {
    try {
      const clientId = KEYS.clientId;
      await APIcalls.redirectToAuthCodeFlow(clientId);
    } catch (error) {
      debugLog("Login failed:", error);
    }
  };

  //---------------------------------------//
  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <>
      <Logout setLogin={setLogin} />
      <h1>Jammming</h1>

      {/* NEW: User Authentication Section */}
      {!isUserAuthenticated ? (
        <div
          style={{
            margin: "1rem 0",
            padding: "1rem",
            background: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <p>🎵 To save playlists to Spotify, please log in:</p>
          <button
            onClick={handleSpotifyLogin}
            style={{ padding: "0.5rem 1rem" }}
          >
            Login with Spotify
          </button>
        </div>
      ) : (
        <div
          style={{
            margin: "1rem 0",
            padding: "1rem",
            background: "#e8f5e8",
            borderRadius: "8px",
          }}
        >
          <p>✅ Welcome, {user?.display_name}! You can now save playlists.</p>
        </div>
      )}

      <SearchBar setMusicData={setMusicData} apiToken={apiToken} />
      <SearchResults
        musicData={musicData}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
      <Playlist
        playlist={playlist}
        setPlaylist={setPlaylist}
        apiToken={apiToken}
        userToken={userToken}
        user={user}
      />
      {/* <Track
        playlist={playlist}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      /> */}
      <NavigationBar />
    </>
  );
}

export default App;
