function searchPlugins(){searchChunkAPI(document.getElementById("searchInput").value,document.getElementById("filter").value.toLowerCase())}function searchChunkAPI(e,t){t={query:e,search_type:t},t={method:"POST",headers:{"Content-Type":"application/json","TR-Organization":"290c4e97-2332-4376-a254-5b063abfcb5f","TR-Dataset":"bfd9f0a5-335b-4501-9cb2-3ea3c23de3c5",Authorization:"tr-E4XukxDqBIb5XcWjHMlTBIaLNnCAqAnN"},body:JSON.stringify(t)};fetch("https://api.trieve.ai/api/chunk/search",t).then(e=>e.json()).then(e=>{displaySearchResults(e)}).catch(e=>console.error("Error:",e))}function displaySearchResults(e){var t=document.getElementById("searchResults");t.innerHTML="";e=e.score_chunks;e&&Array.isArray(e)?e.forEach(e=>{e=e.metadata;e&&Array.isArray(e)?e.forEach(e=>{e=createCard(e);t.appendChild(e)}):console.error("Invalid metadata:",e)}):(console.error("Invalid score_chunks:",e),t.textContent="No results found.")}function createCard(e){var t,n=document.createElement("div");return n.classList.add("card"),e&&e.link&&e.chunk_html?(e.chunk_html.split(". ").forEach(e=>{var t=DOMPurify.sanitize(e.trim()),e=document.createElement("div");e.innerHTML=t,n.appendChild(e)}),(t=document.createElement("a")).href=e.link,t.textContent="Read more",n.appendChild(t)):(t="Error: Metadata is missing or invalid",n.textContent=t,console.error(t)),n}document.getElementById("searchInput").addEventListener("keydown",function(e){"Enter"===e.key&&searchPlugins()}),document.getElementById("filter").addEventListener("change",function(e){searchPlugins()});
