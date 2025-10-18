import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <form className={styles.srchCtn}>
      <input type="text" placeholder="Search" className={styles.srchInput} />
      <FaSearch className={styles.srchIcon} />
    </form>
  );
}

export default SearchBar;
