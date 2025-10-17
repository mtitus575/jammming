import styles from "../styles/modules/SearchResults.module.css";
import { DATA } from "../mockData";
import { IoAdd } from "react-icons/io5";

function SearchResults() {
  return (
    <ul className={styles.resultsCtn}>
      {DATA.map((album, index) => {
        return (
          <li className={styles.resultLiCtn}>
            <article className={styles.resultData}>
              <div className={styles.albumImgCtn}>
                <img src={album.album.images[0].url} alt="albumImage" />
              </div>
              <div className={styles.nameCtn}>
                <p className={styles.songName}>{album.name}</p>
                <p className={styles.artistName}>{album.artists[0].name}</p>
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
