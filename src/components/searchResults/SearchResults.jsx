//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//======================//

import { useEffect } from "react";
import styles from "./SearchResults.module.css";
import { IoAdd } from "react-icons/io5";
import Playlist from "../playlist/Playlist";

function SearchResults({ musicData, playlist, setPlaylist }) {
  function handleAddClick(song) {
    //Check if the song already exists in the playlist:
    const songExists = playlist.some((track) => track.id === song.id);
    if (songExists) {
      debugLog(`The track already exists in the playlist. NOT added.`);
      return;
    }

    debugLog(`Adding ${song.songName} to playlist.`);
    setPlaylist((prev) => [...prev, song]);

  }
  // useEffect(() => {

  // }, []);

  return (
    <ul className={styles.resultsCtn}>
      {musicData.map((song) => {
        return (
          <li key={song.id} className={styles.resultLiCtn}>
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
            <article className={styles.addToFavBtn}>
              <IoAdd onClick={() => handleAddClick(song)} />
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
