// Simplified data object with no nesting
import song1 from "../../testMusic/song1.mp3";
import song2 from "../../testMusic/song2.mp3";
import song3 from "../../testMusic/song3.mp3";

export const SIMPLE_DATA = [
  {
    id: 'test1',
    songName: "Watermelon Sugar",
    artist: "Harry Styles",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33NT8YuEC48HDIh-tiTbAn0IkNJSHbLKZEQ&s",
    album: "Fine Line",
    song: song1,
  },
  {
    id: 'test2',
    songName: "Blinding Lights",
    artist: "The Weeknd",
    image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    album: "After Hours",
    song: song2,
  },
  {
    id: 'test3',
    songName: "Shape of You",
    artist: "Ed Sheeran",
    image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    album: "÷ (Divide)",
    song: song3,
  },
];

// // Example search results structure
// export const SEARCH_RESULTS = {
//   tracks: {
//     href: "https://api.spotify.com/v1/search?query=harry&type=track&offset=0&limit=20",
//     items: DATA,
//     limit: 20,
//     next: "https://api.spotify.com/v1/search?query=harry&type=track&offset=20&limit=20",
//     offset: 0,
//     previous: null,
//     total: 1000,
//   },
// };
