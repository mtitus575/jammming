import styles from "../../styles/modules/NavigationBar.module.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function NavigationBar() {
  return (
    <nav className={styles.ctn}>
      <button>
        <AiOutlineHome />
        <p>Home</p>
      </button>
      <button>
        <MdOutlineExplore />
        <p>Explore</p>
      </button>
      <button>
        <CgProfile />
        <p>Profile</p>
      </button>
    </nav>
  );
}

export default NavigationBar;
