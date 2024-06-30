import hljs from "highlight.js/lib/core";
import sql from "highlight.js/lib/languages/sql";
import "highlight.js/styles/github.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/layout.scss";
import "./css/object.scss";
import "./css/shape.scss";
import "./css/text.scss";
import Drawio from "./main/pages/drawio/Drawio";

hljs.registerLanguage("sql", sql);

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
            <ToastContainer
                style={{ width: "350px" }}
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </div>
    );
}

export default App;
