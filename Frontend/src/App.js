import Routes from "./components/Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { disableBodyScroll } from "body-scroll-lock";

function App() {
  const targetElement = document.querySelector("#body");
  disableBodyScroll(targetElement);

  return (
    <div id="body">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
