document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchPlugins();
    }
});

document.getElementById("filter").addEventListener("change", function(event) {
    searchPlugins();
});

function searchPlugins() {
    var searchContent = document.getElementById("searchInput").value;
    var filter = document.getElementById("filter").value.toLowerCase();
    
    searchChunkAPI(searchContent, filter);
}

function searchChunkAPI(searchContent, filter) {
    var apiUrl = "https://api.trieve.ai/api/chunk/search";
    var headers = {
        "Content-Type": "application/json",
        "TR-Organization": "290c4e97-2332-4376-a254-5b063abfcb5f",
        "TR-Dataset": "bfd9f0a5-335b-4501-9cb2-3ea3c23de3c5",
        "Authorization": "process.env.API_KEY",
    };

    var requestBody = {
        query: searchContent,
        search_type: filter,
    };

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(data) {
    var searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = ""; // Clear previous search results

    var scoreChunks = data.score_chunks;
    if (scoreChunks && Array.isArray(scoreChunks)) {
        scoreChunks.forEach(chunk => {
            var metadata = chunk.metadata;
            if (metadata && Array.isArray(metadata)) {
                metadata.forEach(item => {
                    var card = createCard(item);
                    searchResultsContainer.appendChild(card);
                });
            } else {
                console.error("Invalid metadata:", metadata);
            }
        });
    } else {
        console.error("Invalid score_chunks:", scoreChunks);
        searchResultsContainer.textContent = "No results found.";
    }
}

function createCard(metadata) {
    var card = document.createElement("div");
    card.classList.add("card");

    if (metadata && metadata.link && metadata.chunk_html) {
        var parts = metadata.chunk_html.split('. ');
        parts.forEach(part => {
            var sanitizedPart = DOMPurify.sanitize(part.trim());
            var div = document.createElement("div");
            div.innerHTML = sanitizedPart;
            card.appendChild(div);
        });

        var link = document.createElement("a");
        link.href = metadata.link;
        link.textContent = "Read more";
        card.appendChild(link);
    } else {
        var errorText = "Error: Metadata is missing or invalid";
        card.textContent = errorText;
        console.error(errorText);
    }

    return card;
}
