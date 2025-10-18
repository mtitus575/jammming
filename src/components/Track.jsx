import styles from "../styles/modules/SearchResults.module.css";
import trackStyles from "../styles/modules/Track.module.css";
import song from "../../../testSong.mp3";
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
    <section style={{ display: "none" }} className={trackStyles.trackCtn}>
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
        <audio src={song} controls></audio>
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
