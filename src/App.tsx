import "./App.scss";

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
    </div>
  );
}

export default App;
