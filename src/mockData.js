export const DATA = [
  {
    id: 0,
    name: "Watermelon Sugar",
    artists: [
      {
        id: "0-1",
        name: "Harry Styles",
        type: "artist",
      },
    ],
    album: {
      id: "0-2",
      name: "Fine Line",
      images: [
        {
          height: 640,
          width: 640,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33NT8YuEC48HDIh-tiTbAn0IkNJSHbLKZEQ&s",
        },
      ],
      release_date: "2019-12-13",
    },
    duration_ms: 174000,
    explicit: false,
    popularity: 85,
    preview_url: "https://p.scdn.co/mp3-preview/xyz123",
    uri: "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
  },
  {
    id: "0VjIjW4GlUZAMYd2vXMi3b",
    name: "Blinding Lights",
    artists: [
      {
        id: "1Xyo4u8uXC1ZmMpatF05PJ",
        name: "The Weeknd",
        type: "artist",
      },
    ],
    album: {
      id: "4yP0hdKOZPNshxUOjY0cZj",
      name: "After Hours",
      images: [
        {
          height: 640,
          width: 640,
          url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        },
        {
          height: 300,
          width: 300,
          url: "https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36",
        },
        {
          height: 64,
          width: 64,
          url: "https://i.scdn.co/image/ab67616d000048518863bc11d2aa12b54f5aeb36",
        },
      ],
      release_date: "2020-03-20",
    },
    duration_ms: 200040,
    explicit: false,
    popularity: 92,
    preview_url: "https://p.scdn.co/mp3-preview/abc456",
    uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
  },
  {
    id: "7qiZfU4dY1lWllzX7mPBI3",
    name: "Shape of You",
    artists: [
      {
        id: "6eUKZXaKkcviH0Ku9w2n3V",
        name: "Ed Sheeran",
        type: "artist",
      },
    ],
    album: {
      id: "3T4tUhGYeRNVUGevb0wThu",
      name: "÷ (Divide)",
      images: [
        {
          height: 640,
          width: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        },
        {
          height: 300,
          width: 300,
          url: "https://i.scdn.co/image/ab67616d00001e02ba5db46f4b838ef6027e6f96",
        },
        {
          height: 64,
          width: 64,
          url: "https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96",
        },
      ],
      release_date: "2017-03-03",
    },
    duration_ms: 233713,
    explicit: false,
    popularity: 89,
    preview_url: "https://p.scdn.co/mp3-preview/def789",
    uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
  },
];

// Example search results structure
export const SEARCH_RESULTS = {
  tracks: {
    href: "https://api.spotify.com/v1/search?query=harry&type=track&offset=0&limit=20",
    items: DATA,
    limit: 20,
    next: "https://api.spotify.com/v1/search?query=harry&type=track&offset=20&limit=20",
    offset: 0,
    previous: null,
    total: 1000,
  },
};
