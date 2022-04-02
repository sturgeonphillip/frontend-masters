import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  const theme = useState("#1ed6d9");
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));

// const App = () => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Journey",
//       animal: "Dog",
//       breed: "Mutt",
//     }),
//     React.createElement(Pet, {
//       name: "Molly",
//       animal: "Dog",
//       breed: "Pembroke Welsh Corgi",
//     }),
//     React.createElement(Pet, {
//       name: "Daisy",
//       animal: "Hamster",
//       breed: "En Vogue",
//     })
//   );
// };

// ReactDOM.render(React.createElement(App), document.getElementById("root"));

// import { HashRouter } from 'react-router-dom' can link routes to/from same page
