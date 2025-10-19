//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}
//======================//

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
//API functions:
import { APIcalls } from "../../APICall";

function SearchBar({ apiToken, setMusicData }) {
  //state:
  const [searchInput, setSearchInput] = useState("");

  //functions:
  async function handleSubmit(e) {
    e.preventDefault();
    debugLog(`Form submitted!`);

    if (!apiToken) {
      debugLog("No API token received in the SearchBar Component.");
      return (
        <>
          <p>An error occurred.</p>
          <p>Your API token is expired.</p>
        </>
      );
    }

    if (searchInput) {
      debugLog(`The searchInput is: ${searchInput}`);
      const data = await APIcalls.searchSpotify(apiToken, searchInput);

      if (!data) {
        debugLog("Data fetch failed with the, searchSpotify, function.");
      } else {
        debugLog(`Data fetch successfull.`, data);
      }

      /*/NEXT STEPS:
        0. Create a function to clear the token when it expires.
        1. Go through the returned data structure - check how data is returned.
        2. extract only the data I need for this app's features for now.
        3. Build an object literal with the data I want.
        4. Consider only using the "tracks" object from the returned data for now.
        4. Save that object to the `musicData` state for usage

        current structure:
        cont obj = {
            songName: "Watermelon Sugar",
            artist: "Harry Styles",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33NT8YuEC48HDIh-tiTbAn0IkNJSHbLKZEQ&s",
            album: "Fine Line",
            song: song1,
          },
      */
    }
  }

  return (
    <form className={styles.srchCtn} onSubmit={handleSubmit}>
      <input
        value={searchInput}
        onChange={({ target }) => setSearchInput(target.value)}
        type="text"
        placeholder="Search"
        className={styles.srchInput}
      />
      <FaSearch className={styles.srchIcon} onClick={handleSubmit} />
    </form>
  );
}

export default SearchBar;
