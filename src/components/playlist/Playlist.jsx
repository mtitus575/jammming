//My DEBUG function:
const DEBUG = false;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

//import logic:
import { useState } from "react";
//components:
import AddToSpotify from "../addToSpotifyBtn/AddToSpotify";
//import styles:
import styles from "../searchResults/SearchResults.module.css";
import playliststyles from "../playlist/PlaylistStyles.module.css";
//icons
import { CiCircleRemove } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";

function Playlist({ playlist, setPlaylist, apiToken, userToken, user }) {
  //This state will be used to store the name of the playlist set by the user
  const [playlistName, setPlaylistName] = useState("");
  const [isEditing, setIsEditing] = useState(true); // Start in editing mode

  function handleSave(e) {
    e.preventDefault();

    if (playlistName.trim()) {
      setIsEditing(false); // Switch to display mode
      debugLog(`Playlist name saved: ${playlistName}`);
    }
  }

  function handleEdit() {
    setIsEditing(true); // Switch back to editing mode
  }

  function handleRemoveClick(songId) {
    debugLog("Removing item from playlist.");
    setPlaylist((prev) => prev.filter((track) => track.id !== songId)); //only keep the trackId that not equal songId. That becomes the new array
  }

  return (
    <>
      {playlist.length > 0 && (
        <form onSubmit={handleSave} className={playliststyles.playlistNameCtn}>
          <input
            className={playliststyles.playlistInput}
            type="text"
            value={playlistName}
            onChange={({ target }) => setPlaylistName(target.value)}
            placeholder={isEditing ? "Enter playlist name" : ""}
            readOnly={!isEditing}
            onClick={handleEdit} // Click to edit when in display mode
            style={{
              textAlign: isEditing ? "left" : "center",
              cursor: isEditing ? "text" : "pointer",
              backgroundColor: isEditing ? "#ddb6f6" : "#5a4e67",
            }}
          />

          {isEditing && (
            <CiSaveUp2
              className={playliststyles.playlistSave}
              onClick={handleSave}
            />
          )}
        </form>
      )}
      <ul>
        {playlist.map((song, index) => {
          return (
            <li className={styles.resultLiCtn} key={song.id}>
              <article className={styles.resultData}>
                <div className={styles.albumImgCtn}>
                  <img src={song.image} alt="albumImage" />
                </div>
                <div className={styles.nameCtn}>
                  <p className={styles.songName}>{song.songName}</p>
                  <p className={styles.artistName}>
                    {song.artist} / {song.album}
                  </p>
                </div>
              </article>
              <article className={styles.addToFavBtn} id={styles.removeSong}>
                <CiCircleRemove onClick={() => handleRemoveClick(song.id)} />
              </article>
            </li>
          );
        })}
        <AddToSpotify
          playlist={playlist}
          playlistName={playlistName}
          apiToken={apiToken}
          userToken={userToken}
          user={user}
        />
      </ul>
    </>
  );
}

export default Playlist;
