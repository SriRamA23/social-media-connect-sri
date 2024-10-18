// Helper function to display results on the page
function displayResult(source, title, link) {
  const resultsDiv = document.getElementById("results");
  const resultItem = document.createElement("div");
  resultItem.className = "result-item";
  resultItem.innerHTML = `<strong>${source}:</strong> <a href="${link}" target="_blank">${title}</a>`;
  resultsDiv.appendChild(resultItem);
}

// YouTube API Fetch (Direct Call)
async function searchYouTube(query) {
    const apiKey = "AIzaSyAdGt0GI-NpGch5lOtRpszPYjL5ERhQpEg"; // YouTube API Key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=${apiKey}`; // Added maxResults=10
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.items.forEach(item => {
        const title = item.snippet.title;
        const link = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        displayResult("YouTube", title, link);
      });
    } catch (error) {
      console.error("YouTube API Error:", error);
    }
  }
  

// Reddit API Fetch (Direct Call)
async function searchReddit(query) {
const url = `https://www.reddit.com/search.json?q=${query}`;

try {
    const response = await fetch(url);
    const data = await response.json();
    data.data.children.slice(0, 10).forEach(post => {  // Limit to 10 results
    const title = post.data.title;
    const link = `https://www.reddit.com${post.data.permalink}`;
    displayResult("Reddit", title, link);
    });
} catch (error) {
    console.error("Reddit API Error:", error);
}
}

// Twitter API Fetch (Using RapidAPI Proxy)
async function searchTwitter(query) {
const url = `https://twitter32.p.rapidapi.com/getSearch?query=${encodeURIComponent(query)}&count=10`;

try {
const response = await fetch(url, {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d87408f598msh61dc87cdb73e030p1f8af3jsn4fe66586cdb0",
    "X-RapidAPI-Host": "twitter32.p.rapidapi.com"
  }
});

if (!response.ok) {
  throw new Error(`Twitter API Error: ${response.statusText}`);
}

const data = await response.json();

// Check if results exist before calling forEach
if (data.results && Array.isArray(data.results)) {
  data.results.forEach(tweet => {
    const text = tweet.text;
    const link = `https://twitter.com/i/web/status/${tweet.id}`;
    displayResult("Twitter", text, link);
  });
} else {
  console.log("No results found on Twitter.");
}
} catch (error) {
console.error("Twitter API Error:", error);
}
}


// Main function to handle the search button click
document.getElementById("submitBtn").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value;
  document.getElementById("results").innerHTML = ""; // Clear previous results

  if (query) {
    searchYouTube(query);  // Fetch YouTube results
    searchReddit(query);   // Fetch Reddit results
    searchTwitter(query);  // Fetch Twitter results
  } else {
    alert("Please enter a search term!");
  }
});
