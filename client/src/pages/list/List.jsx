import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import RoomList from "../../components/roomList/RoomList";
import "./list.css";

const List = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || "");
  const [category, setCategory] = useState(location.state?.category || "");
  const [genderType, setGenderType] = useState(location.state?.genderType || "");
  const [messType, setMessType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [selectedHostelId, setSelectedHostelId] = useState(null);

  const handleSearch = useCallback(async () => {
    const buildApiUrl = () => {
      let params = new URLSearchParams();
      if (category) params.append("category", category);
      if (genderType) params.append("genderType", genderType);
      if (messType !== "") params.append("messType", messType);
      if (searchQuery.trim()) params.append("name", searchQuery.trim());
      return `/hostel?${params.toString()}`;
    };

    try {
      setLoading(true);
      setError(null);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const response = await axios.get(`${process.env.REACT_APP_API_URL}${buildApiUrl()}`, config);
      
      if (Array.isArray(response.data)) {
        setHostels(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setHostels(response.data.data);
      } else if (response.data.hostels && Array.isArray(response.data.hostels)) {
        setHostels(response.data.hostels);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch hostels. Please try again.");
      setHostels([]);
    } finally {
      setLoading(false);
    }
  }, [category, genderType, messType, searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    console.log("Current hostels state:", hostels);
  }, [hostels]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {!selectedHostelId && (
            <div className="listSearch">
              <h1 className="lsTitle">Search Hostels</h1>
              <div className="lsItem">
                <label>Search by Name</label>
                <input
                  type="text"
                  placeholder="Enter hostel name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="lsItem">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Any</option>
                  <option value="Hostel">Hostel</option>
                  <option value="PG">PG</option>
                </select>
              </div>
              <div className="lsItem">
                <label>Gender Type</label>
                <select value={genderType} onChange={(e) => setGenderType(e.target.value)}>
                  <option value="">Any</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>
              </div>
              <div className="lsItem">
                <label>Mess Availability</label>
                <select value={messType} onChange={(e) => setMessType(e.target.value)}>
                  <option value="">Any</option>
                  <option value="true">With Mess</option>
                  <option value="false">Without Mess</option>
                </select>
              </div>
              <button 
                onClick={handleSearch} 
                className="searchButton"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          )}

          <div className="listResult">
            {selectedHostelId ? (
              <RoomList
                hostelId={selectedHostelId}
                onBack={() => setSelectedHostelId(null)}
              />
            ) : (
              <>
                {loading && <div className="loading">Loading hostels...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && hostels.length === 0 && (
                  <div className="noResults">No hostels found. Try different filters.</div>
                )}
                {!loading &&
                  hostels.map((hostel) => (
                    <SearchItem
                      key={hostel._id}
                      hostel={hostel}
                      onBrowseRooms={() => setSelectedHostelId(hostel._id)}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
