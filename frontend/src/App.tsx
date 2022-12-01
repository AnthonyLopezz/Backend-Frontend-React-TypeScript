import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RuteoComplete } from "./app/utilities/routes/RuteoComplete";

import "../src/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../src/assets/css/style.css";



const loading = <div>Stay Calm...</div>;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <RuteoComplete />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
