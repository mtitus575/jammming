//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

import styles from "../addToSpotifyBtn/AddToSpotify.module.css";
import { APIcalls } from "../../APICall";

function AddToSpotify({ playlist, apiToken, playlistName }) {
  // async function handleSave() {
  //   debugLog("Starting process to save playlist to Spotify...");

  //   //Basic Validation:
  //   if (!apiToken) {
  //     alert("No API token available. Please refresh the page");
  //     return;
  //   }

  //   if (!playlistName || playlistName.trim() === "") {
  //     alert("Please enter a playlist name before saving");
  //     return;
  //   }

  //   if (playlist.length === 0) {
  //     alert("Your playlist is empty. Add some songs first.");
  //     return;
  //   }

  //   try {
  //     //Get the users data:
  //     const userId = "testUser123"; //This will be replaced with a actual user on authenticating a user.

  //     debugLog(
  //       `Creating playlist: "${playlistName}" with ${playlist.length} songs`
  //     );

  //     //Create and Save the playlist:
  //     const newPlaylist = await APIcalls.createPlaylist(
  //       apiToken,
  //       userId,
  //       playlistName,
  //       `Created with Jammming app - ${playlist.length} tracks`
  //     );

  //     debugLog("Playlist created successfully!", newPlaylist);
  //     alert(
  //       `Playlist "${playlistName}" created successfully with ${playlist.length} tracks, on Spotify!.`
  //     );
  //   } catch (error) {
  //     debugLog("Error creating playlist:", error);
  //     alert("Failed to create playlist. Please try again")
  //   }
  // }
  // In AddToSpotify.jsx - temporarily test with a simpler request
async function handleSave() {
  debugLog("Testing token...");
  
  try {
    // Test if token works by getting current user
    const testRes = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Authorization": `Bearer ${apiToken}`
      }
    });
    
    debugLog("Token test response:", testRes.status);
    
    if (testRes.status === 401) {
      alert("Token is invalid - you need user authentication, not client credentials");
      return;
    }
    
    const userData = await testRes.json();
    debugLog("User data:", userData);
    
  } catch (error) {
    debugLog("Token test failed:", error);
  }
}

  return (
    <>
      {playlist.length > 0 && (
        <button className={styles.saveToRemote} onClick={handleSave}>
          Save to Spotify
        </button>
      )}
    </>
  );
}

export default AddToSpotify;
