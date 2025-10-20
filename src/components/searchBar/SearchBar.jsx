//My DEBUG function:
const DEBUG = false;
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

      // The data structure I will use for the app for now:
      //--> This can later be updated to add more features based on what the API can provide
      //--> I am only extracting a few things for now by mapping over the returned API data.
      const tracksArr = data.tracks?.items?.map((track) => {
        debugLog(`Extracting tracks from the API data`);
        return {
          id: track.id,
          songName: track.name,
          artist: track.artists[0].name,
          image: track.album.images[0].url,
          album: track.album.name,
          song: track.uri,
        };
      });
      debugLog(`Created an array of TRACK objects:`, tracksArr);

      if (tracksArr && tracksArr.length > 0) {
        debugLog("Saving tracks to musicData state.");
        setMusicData(tracksArr);
      }
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
