import "./UniversityList.scss";
import React, { useState, useEffect } from "react";
import UniversityService from "../.././services/UniversityService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
// import Header from "../../components/UniversityList/SchoolsHeader"
import Rating from "../../components/UniversityList/Rating";
import Footer from "../../components/UniversityList/SchoolsFooter";
import { useCallback } from "react";

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(14);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({});
  const [ratingCounts, setRatingCounts] = useState({});

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true);
      try {
        const allUniversities = await UniversityService.getAllUniversities();
        console.log("Fetched universities: ", allUniversities);
        setUniversities(allUniversities);
        setError(null);
      } catch (err) {
        console.error("Error fetching universities: ", err);
        setError("Failed to fetch universities. Please try again later.");
      }
      setIsLoading(false);
    };

    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }

    const storedRatings = JSON.parse(localStorage.getItem("ratings"));
    if (storedRatings) {
      setRatings(storedRatings);
    }

    const storedRatingCounts = JSON.parse(localStorage.getItem("ratingCounts"));
    if (storedRatingCounts) {
      setRatingCounts(storedRatingCounts);
    }

    fetchUniversities();
  }, []);


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRatingSubmit = (universityName, ratingValue) => {
    setRatings(prevRatings => {
      const prevRating = prevRatings[universityName] || 0;
      const prevCount = ratingCounts[universityName] || 0;
      const newRating = (prevRating * prevCount + ratingValue) / (prevCount + 1);
      return {
        ...prevRatings,
        [universityName]: newRating,
      };
    });

    setRatingCounts(prevCounts => ({
      ...prevCounts,
      [universityName]: (prevCounts[universityName] || 0) + 1,
    }));

    localStorage.setItem("ratings", JSON.stringify(ratings));
    localStorage.setItem("ratingCounts", JSON.stringify(ratingCounts));

  };


  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCountryChange = useCallback((e) => {
    setSelectedCountry(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const sortUniversities = (unis, option) => {
    return unis.slice().sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else if (option === 'country') {
        return a.country.localeCompare(b.country);
      }
      return 0;
    });
  };

  const toggleFavorite = (university) => {
    const isFavorite = favorites.find((fav) => fav.name === university.name);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.name !== university.name));
    } else {
      setFavorites([...favorites, university]);
    }
  };


  const filteredUniversities = universities.filter(uni => {
    const matchesSearchTerm = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || uni.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || uni.country === selectedCountry;
    return matchesSearchTerm && matchesCountry;
  });


  // Remove duplicate universities
  const uniqueUniversities = sortUniversities(
    Array.from(new Set(filteredUniversities.map((uni) => uni.name))).map((name) => {
      return filteredUniversities.find((uni) => uni.name === name);
    }),
    sortOption
  );


  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedUniversities = sortUniversities(uniqueUniversities, sortOption).sort((a, b) => (ratings[b.name] || 0) - (ratings[a.name] || 0));
  const currentItems = sortedUniversities.slice(indexOfFirstItem, indexOfLastItem);
  const countries = Array.from(new Set(universities.map((uni) => uni.country))).sort();

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(uniqueUniversities.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers
    .filter((number) => {
      const shouldDisplay =
        number === currentPage ||
        number === currentPage - 1 ||
        number === currentPage + 1 ||
        number === 1 ||
        number === pageNumbers.length;
      return shouldDisplay;
    })
    .map((number, index, filteredArray) => {
      if (
        index > 0 &&
        number - filteredArray[index - 1] > 1 &&
        filteredArray.length > 1
      ) {
        return (
          <React.Fragment key={`fragment-${number}`}>
            <span>...</span>
            <button
              key={number}
              id={number}
              onClick={handleClick}
              className="page-number"
            >
              {number}
            </button>
          </React.Fragment>
        );
      } else {
        return (
          <button
            key={number}
            id={number}
            onClick={handleClick}
            className="page-number"
          >
            {number}
          </button>
        );
      }
    });



  return (
    <div>
      <div className="main-container">
        <div className="main-content">
          
          <div className="filters-container">
            <input
              type="text"
              placeholder="Search for universities"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select value={selectedCountry} onChange={handleCountryChange}>
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
            </select>
            <button onClick={() => setShowFavorites(!showFavorites)}>
              {showFavorites ? "Show All Universities" : "Show Favorites"}
            </button>
          </div>
          {error ? (<p>{error}</p>) : (isLoading ? (<p className="page-loading">Loading universities...</p>) : (
            <div className="card-container">
              {(showFavorites ? favorites.map((university, index) => (
                <div className="card" key={`${university.name}-${index}`}>
                  <h2>
                    <a
                      href={university.web_pages[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="university-link"
                    >
                      {university.name}
                    </a>
                    <FontAwesomeIcon
                      icon={favorites.find((fav) => fav.name === university.name) ? faStarSolid : faStarRegular}
                      onClick={() => toggleFavorite(university)}
                      className="favorite-icon"
                    />
                  </h2>
                  <p>Country: {university.country}</p>
                  <p>Alpha Two Code: {university.alpha_two_code}</p>
                  <p>State/Province: {university['state-province'] || 'N/A'}</p>
                  <p>Domains: {university.domains.join(', ')}</p>
                  <p>Web Pages: {university.web_pages.map((web_page, i) => (
                    <a key={i} href={web_page} target="_blank" rel="noopener noreferrer">{web_page}</a>
                  ))}</p>

                  <Rating
                    rating={ratings[university.name] || 0}
                    onRatingSubmit={(value) => handleRatingSubmit(university.name, value)}
                  />
                </div>
              ))
                : currentItems.map((university, index) => (
                  <div className="card" key={`${university.name}-${index}`}>
                    <h2>
                      <a
                        href={university.web_pages[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="university-link"
                      >
                        {university.name}
                      </a>
                      <FontAwesomeIcon
                        icon={favorites.find((fav) => fav.name === university.name) ? faStarSolid : faStarRegular}
                        onClick={() => toggleFavorite(university)}
                        className="favorite-icon"
                      />
                    </h2>
                    <p>Country: {university.country}</p>
                    <p>Alpha Two Code: {university.alpha_two_code}</p>
                    <p>State/Province: {university['state-province'] || 'N/A'}</p>
                    <p>Domains: {university.domains.join(', ')}</p>
                    <p>Web Pages: {university.web_pages.map((web_page, i) => (
                      <a key={i} href={web_page} target="_blank" rel="noopener noreferrer">{web_page}</a>
                    ))}</p>
                    <Rating
                      rating={ratings[university.name] || 0}
                      onRatingSubmit={(value) => handleRatingSubmit(university.name, value)}
                    />
                  </div>
                )))}
            </div>
          ))}
          <div className='pagination'>
            {renderPageNumbers}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UniversityList;
