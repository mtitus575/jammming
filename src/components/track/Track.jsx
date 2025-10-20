//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

import styles from "../searchResults/SearchResults.module.css";
import trackStyles from "./Track.module.css";
//icons:
import { CiCircleRemove } from "react-icons/ci";
import { FaShuffle } from "react-icons/fa6";
import { IoIosSkipBackward } from "react-icons/io";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosSkipForward } from "react-icons/io";
import { FaRepeat } from "react-icons/fa6";
import { useEffect } from "react";

function Track({ playlist, currentTrack, setCurrentTrack }) {
  //  currentTrack param will be used to play the active song when any song is being played.
  // Use this is the "currentTrack" class below
  useEffect(() => {
    debugLog("I AM WORKING HERE NEXT!!!");
    /* NEXT steps:
    1. See sticky notes.
     */

    if (playlist.length > 0) {
      debugLog("Setting current track.");
      debugLog(playlist[0].song);
      setCurrentTrack(playlist[0].song);
    }
  }, []);

  return (
    <section style={{ display: "" }} className={trackStyles.trackCtn}>
      <div className={trackStyles.activeTrack}>
        <section className={trackStyles.controlsCtn}>
          <FaShuffle className={trackStyles.icon} />
          <IoIosSkipBackward className={trackStyles.icon} />
          <FaPlayCircle
            className={trackStyles.icon}
            id={trackStyles.playIcon}
          />
          <FaPauseCircle
            className={trackStyles.icon}
            id={trackStyles.pauseIcon}
          />
          <IoIosSkipForward className={trackStyles.icon} />
          <FaRepeat />
        </section>
        <section className={trackStyles.artist}>
          <h5>SongName Placeholder</h5>
          <p>Artist</p>
        </section>
        <input
          type="range"
          name="playProgress"
          id="playProgress"
          className={trackStyles.playProgress}
        />
        <audio src={currentTrack ? currentTrack : ""} controls></audio>
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
