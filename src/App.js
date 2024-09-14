import { useState } from "react";
var data = require("./innomatic.json");

export default function App() {
  const [value, setValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
    setSelectedCountry(null); // Reset selected country when typing
  };

  const onSearch = (searchTerm) => {
    // Find the selected country by name or capital from the data
    const countryData = data.find((item) => 
      item.country.toLowerCase() === searchTerm.toLowerCase() || 
      item.capital.toLowerCase() === searchTerm.toLowerCase()
    );
    setSelectedCountry(countryData);
    console.log('search', searchTerm, countryData);
  };

  return (
    <div className="App">
      <h1>Country Search</h1>
      <div className="search-container">
        <div className="search-inner">
          <input 
            type="text" 
            value={value} 
            onChange={onChange} 
            placeholder="Search by country or capital" 

          />
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        <div className="dropdown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const country = item.country.toLowerCase();
              const capital = item.capital.toLowerCase();
              return (
                searchTerm &&
                (country.startsWith(searchTerm) || capital.startsWith(searchTerm)) &&
                country !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div 
                onClick={() => onSearch(item.country)} 
                className="dropdown-row" 
                key={item.country}
              >
                {item.country} - {item.capital}
              </div>
            ))}
        </div>
      </div>

      {selectedCountry && (
        <div className="country-details">
          <h2>Details for {selectedCountry.country}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Official Language(s):</strong> {Array.isArray(selectedCountry.official_language) ? selectedCountry.official_language.join(', ') : selectedCountry.official_language}</p>
          <p><strong>Currency:</strong> {selectedCountry.currency}</p>
        </div>
      )}
    </div>
  );
}
