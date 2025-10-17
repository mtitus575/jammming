import styles from "../styles/modules/SearchResults.module.css";
//icons:
import { CiCircleRemove } from "react-icons/ci";
import { FaShuffle } from "react-icons/fa6";
import { IoIosSkipBackward } from "react-icons/io";
import { FaPauseCircle } from "react-icons/fa";

import { FaPlayCircle } from "react-icons/fa";

import { IoIosSkipForward } from "react-icons/io";
import { FaRepeat } from "react-icons/fa6";

function Track({ playlist, currentTrack }) {
//  currentTrack param will be used to play the active song when any song is being played.
// Use this is the "currentTrack" class below

  return (
    <section style={{ display: "none" }}>
      <div className="currentTrack">
        <section>
          <FaShuffle />
          <IoIosSkipBackward />
          <FaPlayCircle />
          <FaPauseCircle />
          <IoIosSkipForward />
          <FaRepeat />
        </section>
        <h4>SongName Placeholder</h4>
        <p>Place a progress bar here:</p>
        <p>add time stamps here</p>
      </div>
      <div>
        <h5>Playlist</h5>
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
      </div>
    </section>
  );
}

export default Track;
