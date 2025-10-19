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

function SearchResults({ musicData, setPlaylist }) {
  useEffect(() => {
    const testList2 = musicData[0];
    const testList1 = musicData[1];
    setPlaylist([testList1, testList2]);
  }, [musicData]);

  debugLog(musicData)
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
              <IoAdd />
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
