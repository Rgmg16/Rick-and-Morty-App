import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";

const CharacterList = ({ characters, searchInput, setSearchInput }) => {
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        className="p-2 mb-4 rounded border border-gray-300"
      />
      <ul>
        {filteredCharacters.map(character => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CharacterDetail = ({ characters }) => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const character = characters.find(character => character.id === parseInt(id)); // Find the character based on the id parameter

  // Conditionally render the component only when character is available
  if (!character) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return (
    <div>
      <h2><u>{character.name}</u></h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type ? character.type : "N/A"}</p> {/* Show "N/A" when character type is empty */}
      <p>Gender: {character.gender}</p>
    </div>
  );
};

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setCharacters(data.results);
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-4 bg-cover bg-center h-screen" style={{ backgroundImage: 'url("./public/Ricks-portal.png")'}}>
        <h1 className="text-3xl font-bold mb-4"><u>Rick and Morty Characters</u></h1>
        <CharacterList characters={characters} searchInput={searchInput} setSearchInput={setSearchInput} /> {/* Search bar on every page */}
        <Routes>
          <Route
            path="/"
            element={<CharacterList characters={characters} searchInput={searchInput} setSearchInput={setSearchInput} />}
          />
          <Route
            path="/character/:id"
            element={<CharacterDetail characters={characters} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



