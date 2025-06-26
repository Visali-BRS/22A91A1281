import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlShortener from "./components/UrlShortener";
import RedirectHandler from "./components/RedirectHandler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
