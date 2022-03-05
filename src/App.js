import {useState, useEffect } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import CitiesData from "./Cities.json";
import Data from "./Occupations.json";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [hold, setHold]=useState("");
  const [search, setSearch]=useState("");
  const [results, setResults]=useState([]);
  const [searchInfo, setSearchInfo]=useState(0);
  const [handlI, setHandlI]=useState('0');
  let occFilter;
  let locFilter;
  useEffect(() => {
    occFilter = Data.occupations.filter((value) => {
      return value.toLowerCase().includes(search.toLowerCase());
      });
    locFilter = Object.keys(CitiesData).filter((value) => {
      return value.toLowerCase().includes(search.toLowerCase());
      });
    });
  const handleFilter = (event) => {
    const searchWord = event.target.value;
      if(searchWord.includes(",")){
        const slicedSearch = hold.toString().split(",");
        setSearch(slicedSearch[slicedSearch.length-1]);
        setHold(searchWord)
        setHandlI('1')
      }
      else{
        setSearch(searchWord);
        setHold(searchWord)
      }
      if(filteredData.length!=0){
        document.getElementById("dataResult").style.display = 'block';
      }
    if (searchWord === "") {
      setFilteredData([]);
      setHandlI("0")
    }
    else if(searchWord.includes(",")){
      setFilteredData(locFilter);
    }
     else {
      setFilteredData(occFilter);
    }
  };
  const handleItems = (event) => {
    const selectedWord = event.target.outerText;
    if(hold.includes(",")){
      const spl = hold.toString().split(',');
      const sliced = hold.replace(spl[spl.length-1],'');
      setHold(sliced.concat(selectedWord, " , "));
    }
    else{
      setHold(selectedWord.concat(" , "));
    }
    setSearch("")
    setHandlI('1')
    if(filteredData.length!=0){
    setTimeout(function() {
      document.getElementById("dataResult").style.display = "none";
  }, 1);
  }
  const inp = document.getElementById('text-box');
  inp.focus();   
  };

  const handleSearch = async e=>{
    e.preventDefault();
    if(hold ==='') return;
    if(handlI === '0') return;
    function importAll(r) {
      return r.keys().map(r);
    }
    if(filteredData.length!=0){
      setTimeout(function() {
        document.getElementById("dataResult").style.display = "none";
    }, 1);
    }
    const files = importAll(require.context('../public/CV', false, /\.(txt)$/));
    const iterator = files.values();
    for (const value of iterator) {
      let val = value.replace("/static/media/",'').split('.')[0];
      fetch(`CV/${val}.txt`)
      .then((response) => {
          return response.text();
      })
      .then((text) => {
        let occ= hold.split(" ,")[0].toLowerCase()
        let loc= hold.split(" ,")[1].toLowerCase()
        var ocount = (text.toLowerCase().match(new RegExp(occ, "g")) || []).length;
        if(ocount!=0){
            setResults(prevState => ({
              ...prevState,
              [val]:[occ,ocount],
            }));
        } 
        if(loc != " "){
          var lcount = (text.toLowerCase().match(new RegExp(loc, "g")) || []).length;
          if(lcount!=0){
            setResults(prevState => ({
              ...prevState,
              [val]:[loc,lcount],
            }));
          } 
        }
      });
    }
  }
  const clearInput = () => {
    setFilteredData([]);
    setSearch("");
    setHold("");
    setSearchInfo(0)
    setResults([])
    setHandlI('0')
  };
  return (
    <div className="App">
      <header>
        <h1>people finder</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
          type="text" 
          id="text-box"
          autoComplete="off"
          placeholder="set your occupation and location..."
          value={hold}
          onChange={handleFilter}/>
          <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        </form>
        {(searchInfo)?<p>search Results:{searchInfo}</p>:''}
      
      {filteredData.length != 0 && (
        <div className="dataResult" id="dataResult">
          {filteredData.slice(0, 15).map((v) => {
            return (
              <div key={v} value={v} onClick={handleItems} className="dataItem">
                <p>{v} </p>
              </div>
            );
          })}
        </div>
      )}
      </header>
      {results.length != 0 && (
      <div className="results">
      {Object.entries(results).map(([key,value]) => {
        if(value[1]==0) return
            return (
              <div className="result" key= {key}>
                <h3>{key}</h3>
                <p>{value[0]}: <span className='searchmatch'>{value[1]} </span></p>
              </div>
            );
          })}
      </div>
      )}
    </div>
  );
}

export default App;



const data = [
    "Accounting",
    "Airlines/Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Animation",
    "Apparel & Fashion",
    "Architecture & Planning",
    "Arts & Crafts",
    "Automotive",
    "Aviation & Aerospace",
    "Banking",
    "Biotechnology",
    "Broadcast Media",
    "Building Materials",
    "Business Supplies & Equipment",
    "Capital Markets",
    "Chemicals",
    "Civic & Social Organization",
    "Civil Engineering",
    "Commercial Real Estate",
    "Computer & Network Security",
    "Computer Games",
    "Computer Hardware",
    "Computer Networking",
    "Computer Software",
    "Construction",
    "Consumer Electronics",
    "Consumer Goods",
    "Consumer Services",
    "Cosmetics",
    "Dairy",
    "Defense & Space",
    "Design",
    "Education Management",
    "E-learning",
    "Electrical & Electronic Manufacturing",
    "Entertainment",
    "Environmental Services",
    "Events Services",
    "Executive Office",
    "Facilities Services",
    "Farming",
    "Financial Services",
    "Fine Art",
    "Fishery",
    "Food & Beverages",
    "Food Production",
    "Fundraising",
    "Furniture",
    "Gambling & Casinos",
    "Glass, Ceramics & Concrete",
    "Government Administration",
    "Government Relations",
    "Graphic Design",
    "Health, Wellness & Fitness",
    "Higher Education",
    "Hospital & Health Care",
    "Hospitality",
    "Human Resources",
    "Import & Export",
    "Individual & Family Services",
    "Industrial Automation",
    "Information Services",
    "Information Technology & Services",
    "Insurance",
    "International Affairs",
    "International Trade & Development",
    "Internet",
    "Investment Banking/Venture",
    "Investment Management",
    "Judiciary",
    "Law Enforcement",
    "Law Practice",
    "Legal Services",
    "Legislative Office",
    "Leisure & Travel",
    "Libraries",
    "Logistics & Supply Chain",
    "Luxury Goods & Jewelry",
    "Machinery",
    "Management Consulting",
    "Maritime",
    "Marketing & Advertising",
    "Market Research",
    "Mechanical or Industrial Engineering",
    "Media Production",
    "Medical Device",
    "Medical Practice",
    "Mental Health Care",
    "Military",
    "Mining & Metals",
    "Motion Pictures & Film",
    "Museums & Institutions",
    "Music",
    "Nanotechnology",
    "Newspapers",
    "Nonprofit Organization Management",
    "Oil & Energy",
    "Online Publishing",
    "Outsourcing/Offshoring",
    "Package/Freight Delivery",
    "Packaging & Containers",
    "Paper & Forest Products",
    "Performing Arts",
    "Pharmaceuticals",
    "Philanthropy",
    "Photography",
    "Plastics",
    "Political Organization",
    "Primary/Secondary",
    "Printing",
    "Professional Training",
    "Program Development",
    "Public Policy",
    "Public Relations",
    "Public Safety",
    "Publishing",
    "Railroad Manufacture",
    "Ranching",
    "Real Estate",
    "Recreational",
    "Facilities & Services",
    "Religious Institutions",
    "Renewables & Environment",
    "Research",
    "Restaurants",
    "Retail",
    "Security & Investigations",
    "Semiconductors",
    "Shipbuilding",
    "Sporting Goods",
    "Sports",
    "Staffing & Recruiting",
    "Supermarkets",
    "Telecommunications",
    "Textiles",
    "Think Tanks",
    "Tobacco",
    "Translation & Localization",
    "Transportation/Trucking/Railroad",
    "Utilities",
    "Venture Capital",
    "Veterinary",
    "Warehousing",
    "Wholesale",
    "Wine & Spirits",
    "Wireless",
    "Writing & Editing"
  ];
