//My DEBUG function:
const DEBUG = false;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

import styles from "../addToSpotifyBtn/AddToSpotify.module.css";
import { APIcalls } from "../../APICall";

function AddToSpotify({ playlist, apiToken, playlistName, userToken, user }) {
  // Debug: Log the props to see what we're receiving
  debugLog("AddToSpotify props:", {
    userToken: !!userToken,
    user: !!user,
    playlistName,
  });

  // In AddToSpotify.jsx - user authenticated playlist creation
  async function handleSave() {
    debugLog("Starting playlist save to Spotify...");

    // Check if user is authenticated
    if (!userToken || !user) {
      alert("Please log in with Spotify first to save playlists.");
      return;
    }

    if (!playlistName || playlistName.trim() === "") {
      alert("Please enter a playlist name before saving.");
      return;
    }

    if (playlist.length === 0) {
      alert("Your playlist is empty. Add some songs first!");
      return;
    }

    try {
      debugLog(
        `Creating playlist: "${playlistName}" for user: ${user.display_name}`
      );

      const newPlaylist = await APIcalls.createPlaylist(
        userToken, // Use user token, not API token
        user.id, // Use real user ID
        playlistName,
        `Created with Jammming app - ${playlist.length} tracks`
      );

      debugLog("Playlist created successfully!", newPlaylist);
      alert(`Playlist "${playlistName}" created successfully on Spotify!`);
    } catch (error) {
      debugLog("Error creating playlist:", error);
      alert("Failed to create playlist. Please try again.");
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
