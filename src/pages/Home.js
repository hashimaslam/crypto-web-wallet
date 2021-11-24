import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CreateAccount from "../components/CreateAccount";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ImportExisting from "../components/ImportExisting";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function Home() {
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    let wallets = localStorage.getItem("wallets");
    if (wallets) {
      setWallets(JSON.parse(wallets));
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              //justifyContent: "center",
              margin: "70px 0px",
            }}
          >
            <ImportExisting />
            <Box my={3}>
              <Typography textAlign="center" fontSize="22px">
                or
              </Typography>
            </Box>
            <CreateAccount />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              //justifyContent: "center",
              height: "100%",
              minHeight: 200,
              maxHeight: 700,
              overflow: "scrollY",
              marginTop: "70px",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize="22px"
              marginBottom="10px"
              textAlign="center"
              fontWeight={500}
            >
              Available Accounts
            </Typography>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: 1,
              }}
            >
              {wallets.length === 0 && (
                <Typography fontSize={24} textAlign="center" color="">
                  No Accounts Added Yet
                </Typography>
              )}
              {wallets?.map((wallet) => {
                return (
                  <Link key={wallet} to={`/account/${wallet}`}>
                    <ListItem>
                      <ListItemText
                        link
                        primary={
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography fontSize="16px">{wallet}</Typography>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              size="small"
                            >
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </Box>
                        }
                        sx={{
                          background: "rgba(0, 0, 0, 0.06)",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
}

export default Home;
