import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ethers } from "ethers";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { createAndStoreKeys } from "../utils";
function ImportExisting() {
  const history = useHistory();
  const [data, setData] = useState({
    privatekey: null,
    password: null,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFetch = async () => {
    let wallet = new ethers.Wallet(data.privatekey);
    const address = await wallet.getAddress();
    createAndStoreKeys(wallet, address, data.password);

    history.push(`/account/${address}`);
  };
  return (
    <div>
      <Typography
        fontSize="22px"
        marginBottom="10px"
        textAlign="center"
        fontWeight={500}
      >
        Import Existing Account
      </Typography>
      <Card sx={{ width: 350 }}>
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Private Key"
            variant="filled"
            placeholder="Private Key"
            fullWidth
            margin="dense"
            name="privatekey"
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="filled"
            placeholder="Password"
            fullWidth
            margin="dense"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleFetch}
              color="primary"
              sx={{ marginTop: 1 }}
            >
              Import
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ImportExisting;
