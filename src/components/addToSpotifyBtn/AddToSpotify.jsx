//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//=============================//

import styles from "../addToSpotifyBtn/AddToSpotify.module.css";

function AddToSpotify({ playlist }) {
  function handleSave() {
    //Write code here to save to spotify remotely
    //add debugLog statements
    debugLog("CONTINUE FROM HERE!");
  }
  return (
    <>
      {playlist.length > 0 && (
        <button className={styles.saveToRemote} onClick={handleSave}>
          Save to Spotify
        </button>
      )}
    </>
  );
}

export default AddToSpotify;
