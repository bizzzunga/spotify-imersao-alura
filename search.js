const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`)
    .then((response) => response.json()) 
    // results -> [{name: "Foo Fighters", age: 20}, {name: "Emicida"}]
    // results -> filter -> Uma função que me passa cada valor do result, um a um com o nome que eu dei
    .then((results) => results.filter((item) => item.name.toLowerCase().includes(searchTerm)))
    .then((filteredResults) => displayResults(filteredResults));
}

function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  console.log({results});

  // Três formas de fazer a mesma coisa
  // for (const barbie of results) {
  //   artistImage.src = barbie.urlImg;
  //   artistName.innerText = barbie.name;
  // }

  for (let i = 0; i < results.length; i++) {
    const barbie = results[i];

    artistImage.src = barbie.urlImg;
    artistName.innerText = barbie.name;
  }

  // results.forEach((barbie) => {
  //   artistImage.src = barbie.urlImg;
  //   artistName.innerText = barbie.name;
  // });
  resultArtist.classList.remove("hidden");
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});