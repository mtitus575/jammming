import styles from "../styles/modules/SearchResults.module.css";
import { CiCircleRemove } from "react-icons/ci";

// This holds the songs that the user adds to their play list:
/*It needs:
1. A data/state source - where the added songs are stored
2. map over that source and display a ul with the same data the search result shows.
3. User input field to give the playlist a name
4. Have a button to save this playlist to Spotify
*/

function Playlist({ playlist }) {
  return (
    <>
      <input
        type="text"
        name="playlist"
        id="userPlaylist"
        placeholder="Name Your Playlist"
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
      </ul>
    </>
  );
}

export default Playlist;
