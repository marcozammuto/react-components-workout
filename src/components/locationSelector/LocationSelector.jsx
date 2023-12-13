import { useState, useEffect } from "react";
import "./locationSelector.css";

const Mondo = () => {
  const [limit, setLimit] = useState(4);
  const [finalResult, setFinalResult] = useState([]);
  const [continent, setContinent] = useState();
  const [country, setCountry] = useState();
  const [region, setRegion] = useState();
  const [province, setProvince] = useState();
  const [city, setCity] = useState();

  const world = {
    Europe: {
      name: "Europe",
      countries: [
        "Albania",
        "Austria",
        "Belgium",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Hungary",
        "Ireland",
        "Italy",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Netherlands",
        "Poland",
        "Portugal",
        "Romania",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
      ],
    },
    Africa: {
      name: "Africa",
      countries: [
        "Country",
        "Algeria",
        "Angola",
        "Benin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cameroon",
        "Cape Verde",
        "Chad",
        "Comoros",
        "Congo",
        "Egypt",
        "Ethiopia",
        "Gabon",
        "Gambia",
        "Ghana",
        "Kenya",
        "Lesotho",
        "Liberia",
        "Libya",
      ],
    },
    Asia: {
      name: "Asia",
      countries: [
        "Country",
        "Afghanistan",
        "Armenia",
        "Azerbaigian",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambogia",
        "Cina",
        "Corea del Nord",
        "Corea del Sud",
        "Emirati Arabi Uniti",
        "Filippine",
        "Giappone",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israele",
        "Giordania",
      ],
    },
    America: {
      name: "America",
      countries: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    },
    Oceania: {
      name: "Oceania",
      countries: [
        "Country",
        "Nuovo Galles del Sud",
        "Queensland",
        "Australia Meridionale",
        "Tasmania",
        "Victoria",
        "Australia Occidentale",
        "Territorio del Nord",
        "Territorio della Capitale Australiana",
      ],
    },
  };

  const italianArr = {
    Europe: {
      name: "Europe",
      countries: {
        italy: {
          name: "italy",
          regions: {
            Lombardia: {
              name: "Lombardia",
              provinces: {
                bergamo: {
                  name: "Bergamo",
                  cities: [
                    "Bergamo",
                    "Albino",
                    "Almè",
                    "Dalmine",
                    "Seriate",
                    "Treviglio",
                    "Caravaggio",
                    "Clusone",
                    "Cologno al Serio",
                    "Grumello del Monte",
                  ],
                },
                brescia: {
                  name: "Brescia",
                  cities: [
                    "Brescia",
                    "Desenzano del Garda",
                    "Sirmione",
                    "Limbiate",
                    "Montichiari",
                    "Gardone Riviera",
                    "Peschiera del Garda",
                    "Manerbio",
                    "Poncarale",
                    "Rezzato",
                  ],
                },
                milano: {
                  name: "Milano",
                  cities: [
                    "Milano",
                    "Abbiategrasso",
                    "Assago",
                    "Buccinasco",
                    "Bresso",
                    "Cinisello Balsamo",
                    "Legnano",
                    "Sesto San Giovanni",
                    "Rho",
                    "Corsico",
                  ],
                },
                cremona: {
                  name: "Cremona",
                  cities: [
                    "Cremona",
                    "Crema",
                    "Codogno",
                    "Casalmaggiore",
                    "Soresina",
                    "Casaletto Vaprio",
                    "Ricengo",
                    "Offanengo",
                    "Castelleone",
                    "Vailate",
                  ],
                },
                como: {
                  name: "Como",
                  cities: [
                    "Como",
                    "Cantù",
                    "Erba",
                    "Lomazzo",
                    "Mariano Comense",
                    "Olgiate Comasco",
                    "Grandate",
                    "Alzate Brianza",
                    "Fino Mornasco",
                    "Lurate Caccivio",
                  ],
                },
                lecco: {
                  name: "Lecco",
                  cities: [
                    "Lecco",
                    "Merate",
                    "Calolziocorte",
                    "Casatenovo",
                    "Valmadrera",
                    "Oggiono",
                    "Civate",
                    "Missaglia",
                    "Galbiate",
                    "Mandello del Lario",
                  ],
                },
                mantova: {
                  name: "Mantova",
                  cities: [
                    "Mantova",
                    "Castiglione delle Stiviere",
                    "Curtatone",
                    "Guidizzolo",
                    "San Giorgio Bigarello",
                    "Gonzaga",
                    "Suzzara",
                    "Viadana",
                    "Ostiglia",
                    "Pegognaga",
                  ],
                },
                sondrio: {
                  name: "Sondrio",
                  cities: [
                    "Sondrio",
                    "Chiavenna",
                    "Tirano",
                    "Morbegno",
                    "Cosio Valtellino",
                    "Valfurva",
                    "Aprica",
                    "Grosio",
                    "Talamona",
                    "Lovero",
                  ],
                },
                varese: {
                  name: "Varese",
                  cities: [
                    "Varese",
                    "Busto Arsizio",
                    "Gallarate",
                    "Saronno",
                    "Lonate Pozzolo",
                    "Tradate",
                    "Cassano Magnago",
                    "Venegono Inferiore",
                    "Barasso",
                    "Somma Lombardo",
                  ],
                },
                pavia: {
                  name: "Pavia",
                  cities: [
                    "Pavia",
                    "Vigevano",
                    "Abbiategrasso",
                    "Magenta",
                    "Pieve Emanuele",
                    "Binasco",
                    "Casorate Primo",
                    "Cassolnovo",
                    "Certosa di Pavia",
                    "Garlasco",
                  ],
                },
              },
            },
            Veneto: {
              name: "Veneto",
              provinces: {
                Verona: {
                  name: "Verona",
                  cities: [
                    "Verona",
                    "Bardolino",
                    "Garda",
                    "Lazise",
                    "Peschiera del Garda",
                    "Montecchio Maggiore",
                    "San Bonifacio",
                    "Legnago",
                    "Villafranca di Verona",
                    "Negrar",
                  ],
                },
                Venezia: {
                  name: "Venezia",
                  cities: [
                    "Venezia",
                    "Mestre",
                    "Chioggia",
                    "Jesolo",
                    "Portogruaro",
                    "San Donà di Piave",
                    "Mirano",
                    "Scorzè",
                    "Dolo",
                    "Quarto d'Altino",
                  ],
                },
                Padova: {
                  name: "Padova",
                  cities: [
                    "Padova",
                    "Monselice",
                    "Cittadella",
                    "Este",
                    "Loreggia",
                    "Mestrino",
                    "Vigodarzere",
                    "Rubano",
                    "Cadoneghe",
                    "Bovolenta",
                  ],
                },
                Treviso: {
                  name: "Treviso",
                  cities: [
                    "Treviso",
                    "Conegliano",
                    "Castelfranco Veneto",
                    "Montebelluna",
                    "Vittorio Veneto",
                    "Mogliano Veneto",
                    "Quarto d'Altino",
                    "Paese",
                    "Feltre",
                    "Preganziol",
                    // Potresti aggiungere altri comuni di Treviso
                  ],
                },
              },
            },
            Emilia_Romagna: {
              name: "Emilia Romagna",
              provinces: {
                bologna: {
                  name: "Bologna",
                  cities: [
                    "Bologna",
                    "Imola",
                    "Casalecchio di Reno",
                    "San Lazzaro di Savena",
                    "Castel San Pietro Terme",
                    "Zola Predosa",
                    "Ozzano dell'Emilia",
                    "Sasso Marconi",
                    "Dozza",
                    "Granarolo dell'Emilia",
                  ],
                },
                ferrara: {
                  name: "Ferrara",
                  cities: [
                    "Ferrara",
                    "Copparo",
                    "Comacchio",
                    "Argenta",
                    "Bondeno",
                    "Fiscaglia",
                    "Lagosanto",
                    "Mesola",
                    "Poggio Renatico",
                    "Vigarano Mainarda",
                  ],
                },
                ravenna: {
                  name: "Ravenna",
                  cities: [
                    "Ravenna",
                    "Cervia",
                    "Cesenatico",
                    "Faenza",
                    "Lugo",
                    "Russi",
                    "Bagnacavallo",
                    "Brisighella",
                    "Cotignola",
                    "Sant'Agata sul Santerno",
                  ],
                },
                modena: {
                  name: "Modena",
                  cities: [
                    "Modena",
                    "Carpi",
                    "Sassuolo",
                    "Formigine",
                    "Castelfranco Emilia",
                    "Mirandola",
                    "Vignola",
                    "Finale Emilia",
                    "Soliera",
                    "Nonantola",
                  ],
                },
              },
            },
          },
        },
      },
    },
  };

  const handleContinentChange = (e) => {
    setContinent(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleLimitChange = (value) => {
    value === "+"
      ? setLimit(limit + 1)
      : value === "-"
      ? setLimit(limit - 1)
      : null;
  };

  function isBottomReached() {
    return (
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    );
  }

  function handleScroll() {
    if (isBottomReached()) {
      console.log("Hai raggiunto il fondo della pagina!");
    }
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <section>
        <p>Limit: {limit}</p>
        <p>Continent : {continent}</p>
        <p>Country : {country}</p>
        <p>Region : {region}</p>
        <p>Province : {province}</p>
        <div>
          {province ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Cities :</p>
              <ol>
                {italianArr.Europe.countries.italy.regions[region].provinces[
                  province
                ].cities
                  .map((city) => <li>{city}</li>)
                  .slice(0, limit)}
              </ol>
              <div style={{ display: "flex", gap: "30px" }}>
                <button
                  className="btn"
                  style={{ background: "black", color: "white" }}
                  onClick={() => handleLimitChange("+")}
                >
                  Show more
                </button>
                <button
                  className="btn"
                  style={{ background: "black", color: "white" }}
                  onClick={() => handleLimitChange("-")}
                >
                  Show less
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <form
        style={{ display: "flex", flexDirection: "column", width: "200px" }}
      >
        <select onChange={handleContinentChange}>
          <option disabled selected value={"Country"}>
            Continent
          </option>
          {Object.keys(world).map((continent, idx) => (
            <option key={idx} value={continent.name}>
              {continent}
            </option>
          ))}
        </select>

        {continent ? (
          <>
            <select onChange={handleCountryChange}>
              <option disabled selected value={"Country"}>
                Country
              </option>
              {world[continent].countries.map((country, idx) => (
                <option key={idx}>{country}</option>
              ))}
            </select>
          </>
        ) : null}

        {country ? (
          <>
            <select onChange={handleRegionChange}>
              <option disabled selected value={"Region"}>
                Region
              </option>
              {country === "Italy"
                ? Object.keys(
                    italianArr[continent].countries.italy.regions
                  ).map((region, idx) => <option key={idx}>{region}</option>)
                : null}
            </select>
          </>
        ) : null}

        {region ? (
          <>
            <select onChange={() => {handleProvinceChange, setLimit(4)}}>
              {Object.keys(
                italianArr[continent].countries.italy.regions[region].provinces
              ).map((province, idx) => (
                <option key={idx}>{province}</option>
              ))}
            </select>
          </>
        ) : null}

        {/* {province ? (
          <>
            <p>City</p>
            <select onChange={handleCityChange}>
              {italianArr.Europe.countries.italy.regions[region].provinces[
                province
              ].cities.map((city) => (
                <option>{city}</option>
              ))}
            </select>
          </>
        ) : null} */}
      </form>
    </div>
  );
};

export default Mondo;

// Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
