import Recipes from "./components/Recipes";
import { BrowserRouter as Router, Link, Routes, Route,useLocation } from "react-router-dom";
import Recipe from "./routes/Recipe";

function WrappedApp() {
  const location = useLocation();
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipes" element={<Recipe />} />
        </Routes>

        {location.pathname !== "/recipes" && (
          <Link to="/recipes">
            <button className="bg-blue-500 mt-48 text-white py-2 px-4 rounded hover:bg-blue-700">
              Go to view recipes
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

function App(){
  return(
    <Router>
      <WrappedApp />
    </Router>
  )
}

export default App;
