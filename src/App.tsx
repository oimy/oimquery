import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/layout.scss";
import "./css/object.scss";
import "./css/shape.scss";
import "./css/text.scss";
import Drawio from "./main/pages/drawio/Drawio";

function App() {
    return (
        <div className="app">
            <header></header>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/drawio" element={<Drawio />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
