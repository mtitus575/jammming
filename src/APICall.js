import { MdDescription } from "react-icons/md";

//My DEBUG function:
const DEBUG = true;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}

//Exporting functions as an object:
export const APIcalls = {
  getSpotifyToken: getSpotifyToken,
  searchSpotify: searchSpotify,
  createPlaylist: createPlaylist,
  // Add new user auth functions
  redirectToAuthCodeFlow: redirectToAuthCodeFlow,
  getUserAccessToken: getUserAccessToken,
  getCurrentUser: getCurrentUser,
};

//### API function calls:
async function getSpotifyToken(clientId, clientSecret) {
  const url = "https://accounts.spotify.com/api/token";

  // Create form data as URLSearchParams for Spotify API
  const requestBody = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

  try {
    debugLog("Fetching access token from Spotify API...");
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody,
    });

    if (!res.ok) {
      throw new Error(`API call failed. Status: ${res.status}`);
    }

    const data = await res.json();
    debugLog("Full token response:", data); // Added more debugging
    debugLog("Access token:", data.access_token);
    return data;
  } catch (error) {
    console.error("Full error:", error); // Added more debugging
  }
}

/*The default values for type:
I removed  `type = "track,artist,album"`
This can later be added to get more types when the user searches */
async function searchSpotify(token, searchInput, type = "track") {
  // Clean and encode the search input
  const cleanQuery = searchInput.trim();
  const encodedQuery = encodeURIComponent(cleanQuery);
  const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=${type}&limit=10`;

  try {
    debugLog(`Searching for: "${searchInput}"`);
    debugLog("Search URL:", url); // Added debugging
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      debugLog("Search failed with status:", res.status); // Added debugging
      console.error("Search failed with status:", res.status); // Added debugging
      if (res.status === 401) {
        debugLog("API token expired!");
      }
      throw new Error(`API call failed. Status: ${res.status}`);
    }

    const data = await res.json();
    debugLog("Search results:");
    debugLog(data);
    return data;
  } catch (error) {
    console.error("Error searching Spotify:", error.message);
    console.error("Full search error:", error); // Added debugging
  }
}

async function createPlaylist(
  token,
  userId,
  playlistName,
  playlistDescription = ""
) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

  const playlistData = {
    name: playlistName,
    description: playlistDescription,
    public: false, //private by default
  };
  try {
    debugLog("Creating playlist on SPotify...");
    debugLog("Playlist data:", playlistData);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    });

    if (!res.ok) {
      debugLog("Create playlist falied with status:", res.status);
      throw new Error(`Failed to create playlist. Status: ${res.status}`);
    }

    const data = await res.json();
    debugLog("Playlist created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
}

// ============ NEW USER AUTHENTICATION FUNCTIONS ============

// Generate code verifier for PKCE
function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Generate code challenge for PKCE
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Redirect to Spotify authorization
async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://127.0.0.1:5176/");
  params.append("scope", "user-read-private playlist-modify-private");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Get user access token
async function getUserAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://127.0.0.1:5176/");
  params.append("code_verifier", verifier);

  try {
    debugLog("Exchanging code for user access token...");
    debugLog("Request params:", Object.fromEntries(params));

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!result.ok) {
      const errorData = await result.text();
      debugLog("Token exchange error response:", errorData);
      throw new Error(`Token request failed: ${result.status} - ${errorData}`);
    }

    const data = await result.json();
    debugLog("User access token received");
    return data;
  } catch (error) {
    console.error("Error getting user token:", error);
    throw error;
  }
}

// Get current user profile
async function getCurrentUser(token) {
  try {
    debugLog("Fetching user profile...");
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!result.ok) {
      throw new Error(`User fetch failed: ${result.status}`);
    }

    const data = await result.json();
    debugLog("User profile received:", data.display_name);
    return data;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}
