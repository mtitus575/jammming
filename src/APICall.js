//My DEBUG function:
const DEBUG = false;
function debugLog(...params) {
  if (DEBUG) {
    console.log(...params);
  }
}

//Exporting functions as an object:
export const APIcalls = {
  getSpotifyToken: getSpotifyToken,
  searchSpotify: searchSpotify,
};

//API function calls:
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

async function searchSpotify(token, searchInput, type = "track,artist,album") {
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
