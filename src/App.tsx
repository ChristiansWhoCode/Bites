import "./App.scss";
import Footer from "./components/layout/Footer/Footer";

import Header from "./components/layout/Header/Header";
import AppRouter from "./router";

function App() {
  return (
    <div className="main">
      <AppRouter>
        <div className="header-container">
          <Header />
        </div>
      </AppRouter>
      <Footer className="footer" />
    </div>
  );
}

export default App;
