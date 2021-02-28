import Routes from "./components/Routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div id="body">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
