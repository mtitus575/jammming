//import logic:
import { useState } from "react";
//import styles:
import styles from "../searchResults/SearchResults.module.css";
import playliststyles from "../searchBar/SearchBar.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";

function Playlist({ playlist }) {
  //This state will be used to store the name of the playlist set by the user
  const [playlistName, setPlaylistName] = useState("");
  const [displayPlaylistName, setDisplayPlaylistName] = useState(false);

  //ClickHandler to save user playlist name:
  function handlePlaylistNameClick() {
    setDisplayPlaylistName(true);
  }

  return (
    <>
      <div className={playliststyles.playlistNameCtn}>
        <input
          className={playliststyles.playlistInput}
          type="text"
          name="playlist"
          id="userPlaylist"
          placeholder="Playlist name"
          // value={playlistName}
          onChange={({ target }) => setPlaylistName(target.value)}
        />
        <CiSaveUp2
          className={playliststyles.playlistSave}
          onClick={handlePlaylistNameClick}
        />
      </div>
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
                <CiCircleRemove />
              </article>
            </li>
          );
        })}
        <button className={playliststyles.saveToRemote}>Save to Spotify</button>
      </ul>
    </>
  );
}

export default Playlist;
