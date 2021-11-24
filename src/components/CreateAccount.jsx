import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
function CreateAccount() {
  const history = useHistory();
  const [data, setData] = useState({
    name: null,
    password: null,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    const wallet = ethers.Wallet.createRandom();
    const address = await wallet.getAddress();
    let encryptedPk = CryptoJS.AES.encrypt(
      JSON.stringify(wallet.privateKey),
      data.password
    ).toString();
    localStorage.setItem(address, JSON.stringify(encryptedPk));
    localStorage.getItem("wallets")
      ? localStorage.setItem(
          "wallets",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("wallets")),
            address,
          ])
        )
      : localStorage.setItem("wallets", JSON.stringify([address]));

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
        Create Account
      </Typography>
      <Card sx={{ width: 350 }}>
        <CardContent>
          <TextField
            id="outlined-basic"
            label="Account Name"
            variant="filled"
            placeholder="Account Name"
            fullWidth
            margin="dense"
            name="name"
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
              color="primary"
              sx={{ marginTop: 1 }}
              onClick={handleClick}
            >
              Create
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateAccount;
