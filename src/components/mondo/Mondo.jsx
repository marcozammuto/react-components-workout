import { count } from "d3";
import { useState, useEffect } from "react";
import { displayPartsToString } from "typescript";

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
        "Country",
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
                    // Potresti aggiungere altri comuni di Bergamo
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
                    // Potresti aggiungere altri comuni di Brescia
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
                    // Potresti aggiungere altri comuni di Milano
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
                    // Potresti aggiungere altri comuni di Cremona
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
                    // Potresti aggiungere altri comuni di Como
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
                    // Potresti aggiungere altri comuni di Lecco
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
                    // Potresti aggiungere altri comuni di Mantova
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
                    // Potresti aggiungere altri comuni di Sondrio
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
                    // Potresti aggiungere altri comuni di Varese
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
                    // Potresti aggiungere altri comuni di Pavia
                  ],
                },
                // Potresti continuare ad aggiungere altre province con comuni
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
                    // Potresti aggiungere altri comuni di Verona
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
                    // Potresti aggiungere altri comuni di Venezia
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
                    // Potresti aggiungere altri comuni di Padova
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
                // Potresti continuare ad aggiungere altre province con comuni
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
                // Potresti continuare ad aggiungere altre province con comuni
              },
            },
            // Potresti continuare ad aggiungere altre regioni con province e comuni
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

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "100px" }}>
      <section>
        <p>World Selector</p>
        <p>Limit: {limit}</p>
        <p>Continent : {continent}</p>
        <p>Country : {country}</p>
        <p>Region : {region}</p>
        <p>Province : {province}</p>
        <p>City : {city}</p>
      </section>

      <form style={{ display: "flex", flexDirection: "column", width:"200px"}}>
        <select onChange={handleContinentChange}>
          <option disabled selected>
            Select a Continent
          </option>
          {Object.keys(world).map((continent, idx) => (
            <option key={idx}>{continent}</option>
          ))}
        </select>

        {continent ? (
          <>
            <p>Country</p>
            <select onChange={handleCountryChange}>
              {world[continent].countries.map((country, idx) => (
                <option key={idx}>{country}</option>
              ))}
            </select>
          </>
        ) : null}

        {country ? (
          <>
            <p>Region</p>
            <select onChange={handleRegionChange}>
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
            <p>Province</p>
            <select onChange={handleProvinceChange}>
              {Object.keys(
                italianArr[continent].countries.italy.regions[region].provinces
              ).map((province, idx) => (
                <option key={idx}>{province}</option>
              ))}
            </select>
          </>
        ) : null}

        {province ? (
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
        ) : null}
      </form>
    </div>
  );
};

export default Mondo;
