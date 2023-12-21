import "./App.css";
import MainContent from "./MainContent";
import { CitiesProvider } from "./context/citiesCoontext";
import { AuthProvider } from "./context//FakeAuthContext";
import { Home } from "./pages/Home";
const App = () => {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <Home />
        </CitiesProvider>
      </AuthProvider>
    </>
  );
};

export default App;
