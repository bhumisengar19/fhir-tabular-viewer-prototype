import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/patients")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(row => 
    row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-bar">
          <h2>FHIR Patient Table</h2>
          <div className="search-wrapper">
             <input 
                type="text" 
                placeholder="Search patient names..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
             />
          </div>
        </div>

        {loading ? (
          <div className="loading">Fetching Patient Data...</div>
        ) : (
          <div className="table-responsive">
            <table className="fhir-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Given Name</th>
                  <th>Gender</th>
                  <th>GSoC Flattened Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td className="id-cell">{row.id}</td>
                      <td>{row.name}</td>
                      <td><span className={`gender-tag ${row.gender}`}>{row.gender}</span></td>
                      <td className="flat-cell">
                        {row.flattened?.birthDate ? `Born: ${row.flattened.birthDate}` : "No Birthdate"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-results">No patients matching your search</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
