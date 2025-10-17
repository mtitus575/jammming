import { useState } from "react";
import "../styles/modules/App.css";
import SearchBar from "./SearchBar";

function App() {
  return (
    <>
      <h1>Jammming</h1>
      <SearchBar />
      <div>
        <section style={{ border: "1px solid", marginBottom: 8 }}>
          <h2>New albums</h2>
          <p>view all</p>
        </section>
        <section
          className="imgCarousel"
          style={{ border: "1px solid", marginBottom: 8 }}
        >
          <div>
            <p>Song name</p>
            <p>artist Name</p>
          </div>
        </section>
      </div>
      <div style={{ border: "2px solid blue" }}>
        <h2>Recently played</h2>
        <ol style={{ border: "1px solid" }}>
          <li className="useGridLayoutForChildren li-MustBeRepeatedForDataset">
            <img src="#" alt="album img" />
            <p>Song name</p>
            <p>artist</p>
            <button>Add to Fav</button>
            <button>. . .</button>
          </li>
        </ol>
      </div>
      <nav>
        <button>Home</button>
        <button>Explore</button>
        <button>Profile</button>
      </nav>
    </>
  );
}

export default App;
