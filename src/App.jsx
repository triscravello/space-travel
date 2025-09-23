import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { SpaceTravelProvider } from "./context/SpaceTravelContext";

function App ()
{
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <main className={styles.app__main}>
          <SpaceTravelProvider>
            <AppRoutes />
          </SpaceTravelProvider>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
