import React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/account/:walletAddress" component={Account} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
