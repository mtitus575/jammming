import styles from "../../styles/modules/NavigationBar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function NavigationBar() {
  return (
    <nav className={styles.ctn}>
      <button>
        <AiOutlineHome className={styles.icon}/>
        <p>Home</p>
      </button>
      <button>
        <MdOutlineExplore className={styles.icon}/>
        <p>Playlist</p>
      </button>
      <button>
        <CgProfile className={styles.icon}/>
        <p>Profile</p>
      </button>
    </nav>
  );
}

export default NavigationBar;
