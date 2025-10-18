import { useEffect } from "react";
import styles from "./SearchResults.module.css";
import { IoAdd } from "react-icons/io5";

function SearchResults({ musicData, setPlaylist }) {
  //TO DO:
  //The use effect updates the state of the playlist.
  // 1. User clicks "add to playlist" on the search result
  // 2.Use effect triggered with an onClick function for that specific item
  useEffect(() => {
    const testList2 = musicData[0];
    const testList1 = musicData[1];

    setPlaylist([testList1, testList2]);
  }, [musicData]);

  return (
    <ul className={styles.resultsCtn}>
      {musicData.map((song) => {
        return (
          <li className={styles.resultLiCtn}>
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
