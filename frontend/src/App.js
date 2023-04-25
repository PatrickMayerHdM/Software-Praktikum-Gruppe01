import OnBoarding from "./pages/OnBoarding";
import LogIn from "./pages/LogIn";

function App() {
  return (
        // Darstellung der Test-Funktionen (LogIn-Page und OnBoarding-Page)
    <div className="App">
     <LogIn/>
        <OnBoarding/>
    </div>
  );
}
// Exportieren der App-Komponente als Standard
export default App;
