// routes
import React, { useState, useEffect } from "react";

import Router from "./routes/routes";

// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import CustomToaster from "./custom/Toast/CustomToaster";
import authService from "./services/authService";
import Loading from "./layouts/loading/Loading";
import { UserContext } from "./store/Contexts";
import "./pages/StyleMain.css";
import Loader from "./components/Loader";

// ----------------------------------------------------------------------

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService
      .getUserByToken()
      .then((response) => {
        console.log(response.data);
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <ThemeProvider>
      <CustomToaster />
      <ScrollToTop />
      <StyledChart />
      <UserContext.Provider value={{ user, setUser }}>
        {loading ? <Loading /> : <Router />}
      </UserContext.Provider>
    </ThemeProvider>
  );
}
