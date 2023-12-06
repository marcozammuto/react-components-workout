import { count } from "d3";
import { useState, useEffect } from "react";

const Mondo = () => {
  const [limit, setLimit] = useState(4);
  const [finalResult, setFinalResult] = useState([]);
  const [continent, setContinent] = useState(null);
  const [country, setCountry] = useState();
  const [region, setRegion] = useState();
  const [province, setProvince] = useState();
  const [city, setCity] = useState();

  const world = {
    Europe: {
      name: "Europe",
      countries: [
        "Pick a country",
        "Italy",
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
    italiaRegions: {
      name: "Italy",
      regions: [
        ["Abruzzo", ["L'Aquila", "Teramo", "Pescara", "Chieti"]],
        ["Basilicata", ["Potenza", "Matera"]],
        [
          "Calabria",
          [
            "Catanzaro",
            "Cosenza",
            "Reggio Calabria",
            "Crotone",
            "Vibo Valentia",
          ],
        ],
        ["Campania", ["Napoli", "Salerno", "Avellino", "Benevento", "Caserta"]],
        [
          "Emilia-Romagna",
          [
            "Bologna",
            "Modena",
            "Parma",
            "Reggio Emilia",
            "Ferrara",
            "Ravenna",
            "Forlì-Cesena",
            "Piacenza",
            "Rimini",
          ],
        ],
        ["Friuli-Venezia Giulia", ["Trieste", "Gorizia", "Pordenone", "Udine"]],
        ["Lazio", ["Roma", "Latina", "Frosinone", "Viterbo", "Rieti"]],
        ["Liguria", ["Genova", "Imperia", "La Spezia", "Savona"]],
        [
          "Lombardia",
          [
            "Milano",
            "Bergamo",
            "Brescia",
            "Como",
            "Cremona",
            "Lecco",
            "Lodi",
            "Mantova",
            "Pavia",
            "Sondrio",
            "Varese",
          ],
        ],
        [
          "Marche",
          ["Ancona", "Pesaro e Urbino", "Macerata", "Ascoli Piceno", "Fermo"],
        ],
        ["Molise", ["Campobasso", "Isernia"]],
        [
          "Piemonte",
          [
            "Torino",
            "Alessandria",
            "Asti",
            "Biella",
            "Cuneo",
            "Novara",
            "Verbano-Cusio-Ossola",
            "Vercelli",
          ],
        ],
        [
          "Puglia",
          [
            "Bari",
            "Brindisi",
            "Foggia",
            "Lecce",
            "Taranto",
            "Barletta-Andria-Trani",
          ],
        ],
        [
          "Sardegna",
          ["Cagliari", "Nuoro", "Oristano", "Sassari", "Sud Sardegna"],
        ],
        [
          "Sicilia",
          [
            "Palermo",
            "Agrigento",
            "Caltanissetta",
            "Catania",
            "Enna",
            "Messina",
            "Ragusa",
            "Siracusa",
            "Trapani",
          ],
        ],
        [
          "Toscana",
          [
            "Firenze",
            "Arezzo",
            "Grosseto",
            "Livorno",
            "Lucca",
            "Massa-Carrara",
            "Pisa",
            "Pistoia",
            "Prato",
            "Siena",
          ],
        ],
        ["Trentino-Alto Adige", ["Trento", "Bolzano"]],
        ["Umbria", ["Perugia", "Terni"]],
        ["Valle d'Aosta", ["Aosta"]],
        [
          "Veneto",
          [
            "Venezia",
            "Belluno",
            "Padova",
            "Rovigo",
            "Treviso",
            "Verona",
            "Vicenza",
          ],
        ],
      ],
    },
  };

  const regioniItaliane = [
    ["Abruzzo", ["L'Aquila", "Teramo", "Pescara", "Chieti"]],
    ["Basilicata", ["Potenza", "Matera"]],
    [
      "Calabria",
      ["Catanzaro", "Cosenza", "Reggio Calabria", "Crotone", "Vibo Valentia"],
    ],
    ["Campania", ["Napoli", "Salerno", "Avellino", "Benevento", "Caserta"]],
    [
      "Emilia-Romagna",
      [
        "Bologna",
        "Modena",
        "Parma",
        "Reggio Emilia",
        "Ferrara",
        "Ravenna",
        "Forlì-Cesena",
        "Piacenza",
        "Rimini",
      ],
    ],
    ["Friuli-Venezia Giulia", ["Trieste", "Gorizia", "Pordenone", "Udine"]],
    ["Lazio", ["Roma", "Latina", "Frosinone", "Viterbo", "Rieti"]],
    ["Liguria", ["Genova", "Imperia", "La Spezia", "Savona"]],
    [
      "Lombardia",
      [
        "Milano",
        "Bergamo",
        "Brescia",
        "Como",
        "Cremona",
        "Lecco",
        "Lodi",
        "Mantova",
        "Pavia",
        "Sondrio",
        "Varese",
      ],
    ],
    [
      "Marche",
      ["Ancona", "Pesaro e Urbino", "Macerata", "Ascoli Piceno", "Fermo"],
    ],
    ["Molise", ["Campobasso", "Isernia"]],
    [
      "Piemonte",
      [
        "Torino",
        "Alessandria",
        "Asti",
        "Biella",
        "Cuneo",
        "Novara",
        "Verbano-Cusio-Ossola",
        "Vercelli",
      ],
    ],
    [
      "Puglia",
      [
        "Bari",
        "Brindisi",
        "Foggia",
        "Lecce",
        "Taranto",
        "Barletta-Andria-Trani",
      ],
    ],
    ["Sardegna", ["Cagliari", "Nuoro", "Oristano", "Sassari", "Sud Sardegna"]],
    [
      "Sicilia",
      [
        "Palermo",
        "Agrigento",
        "Caltanissetta",
        "Catania",
        "Enna",
        "Messina",
        "Ragusa",
        "Siracusa",
        "Trapani",
      ],
    ],
    [
      "Toscana",
      [
        "Firenze",
        "Arezzo",
        "Grosseto",
        "Livorno",
        "Lucca",
        "Massa-Carrara",
        "Pisa",
        "Pistoia",
        "Prato",
        "Siena",
      ],
    ],
    ["Trentino-Alto Adige", ["Trento", "Bolzano"]],
    ["Umbria", ["Perugia", "Terni"]],
    ["Valle d'Aosta", ["Aosta"]],
    [
      "Veneto",
      [
        "Venezia",
        "Belluno",
        "Padova",
        "Rovigo",
        "Treviso",
        "Verona",
        "Vicenza",
      ],
    ],
  ];

  const handleContinentChange = (e) => {
    setContinent(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }

  //   const sortResult = () => {
  //     setFinalResult(world[continent].slice(0, limit));
  //   };

  return (
    <div>
      <p>World Selector</p>
      <p>Limit: {limit}</p>
      <p>Continent : {continent}</p>

      <form>
        <select onChange={handleContinentChange}>
          {Object.keys(world).map((continent) => (
            <option>{continent}</option>
          ))}
        </select>

        {continent ? (
          <select onChange={handleCountryChange}>
            {world[continent].countries.map((country) => (
              <option>{country}</option>
            ))}
          </select>
        ) : null}

      {country === "Italy" ? <p>a</p>: null}
      </form>
    </div>
  );
};

export default Mondo;
