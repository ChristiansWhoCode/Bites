import "./App.scss";

import Header from "./components/layout/Header/Header";
import AppRouter from "./router";

function App() {
  return (
    <AppRouter>
      <div className="header-container">
        <Header />
      </div>
    </AppRouter>
  );
}

export default App;
