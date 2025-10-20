//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

//import logic:
import { useState } from "react";
//import styles:
import styles from "../searchResults/SearchResults.module.css";
import playliststyles from "../searchBar/SearchBar.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";

function Playlist({ playlist, setPlaylist }) {
  //This state will be used to store the name of the playlist set by the user
  const [playlistName, setPlaylistName] = useState("");
  const [displayPlaylistName, setDisplayPlaylistName] = useState(false);

  //ClickHandler to save user playlist name:
  function handleNameClick(e) {
    e.preventDefault();

    setDisplayPlaylistName(true);
  }

  function handleRemoveClick(songId) {
    debugLog("Removing item from playlist.");
    setPlaylist((prev) => prev.filter((track) => track.id !== songId)); //only keep the trackId that not equal songId. That becomes the new array
  }

  return (
    <>
      {!displayPlaylistName && (
        <form
          name="playlistName"
          className={playliststyles.playlistNameCtn}
          onSubmit={handleNameClick}
        >
          <input
            className={playliststyles.playlistInput}
            type="text"
            name="playlist"
            id="userPlaylist"
            placeholder="Playlist name"
            // value={playlistName}
            onChange={({ target }) => setPlaylistName(target.value)}
            onSubmit={handleNameClick}
          />
          <CiSaveUp2
            className={playliststyles.playlistSave}
            onClick={handleNameClick}
          />
        </form>
      )}
      {!displayPlaylistName ? (
        ""
      ) : (
        <input
          id="userPlaylistName"
          type="text"
          value={playlistName}
          className={playliststyles.playlistInput}
          style={{ display: "", textAlign: "center" }}
        />
      )}
      <ul>
        {playlist.map((song, index) => {
          return (
            <li className={styles.resultLiCtn} key={index}>
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
        {playlist.length > 0 && (
          <button className={playliststyles.saveToRemote}>
            Save to Spotify
          </button>
        )}
      </ul>
    </>
  );
}

export default Playlist;
