//import logic:
import { useState } from "react";
//import styles:
import styles from "../styles/modules/SearchResults.module.css";
import playliststyles from "../styles/modules/SearchBar.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";

function Playlist({ playlist }) {
  //This state will be used to store the name of the playlist set by the user
  const [playlistName, setPlaylistName] = useState("New Name");

  return (
    <>
      <div className={playliststyles.playlistNameCtn}>
        <input
          className={playliststyles.playlistInput}
          type="text"
          name="playlist"
          id="userPlaylist"
          placeholder="Playlist name"
        />
        <CiSaveUp2 className={playliststyles.playlistSave} />
      </div>
      <input
        id="userPlaylistName"
        type="text"
        value={playlistName}
        className={playliststyles.playlistInput}
        style={{ display: "", textAlign: " center" }}
      />
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
