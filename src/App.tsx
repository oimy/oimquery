import hljs from "highlight.js/lib/core";
import kotlin from "highlight.js/lib/languages/kotlin";
import sql from "highlight.js/lib/languages/sql";
import "highlight.js/styles/github.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/layout.scss";
import "./css/object.scss";
import "./css/shape.scss";
import "./css/text.scss";
import Header from "./main/components/header/Header";
import ThemedToastContainer from "./main/components/toast/ThemedToastContainer";
import Kotlin from "./main/pages/kotlin/Kotlin";
import Mysql from "./main/pages/mysql/Mysql";
import { routeMilestones } from "./routes";

hljs.registerLanguage("sql", sql);
hljs.registerLanguage("kotlin", kotlin);

function App() {
    return (
        <div className="app">
            <Header routeMilestones={routeMilestones} />
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/mysql" element={<Mysql />} />
                        <Route path="/kotlin" element={<Kotlin />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <ThemedToastContainer />
        </div>
    );
}

export default App;
