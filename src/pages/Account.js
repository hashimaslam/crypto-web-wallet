import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { ethers } from "ethers";
import { TextField, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
function Account() {
  const history = useHistory();
  const [password, setPassword] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    balance: 0,
    publicKey: "",
    error: false,
  });
  let { walletAddress } = useParams();
  useEffect(() => {}, [walletAddress]);
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const checkPass = async () => {
    try {
      const bytes = CryptoJS.AES.decrypt(
        JSON.parse(localStorage.getItem(walletAddress)),
        password
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let wallet = new ethers.Wallet(decryptedData);

      const address = await wallet.getAddress();
      // console.log(await wallet.getBalance(), "from balance");
      if (address === walletAddress) {
        setIsLoggedIn(true);
        const provider = ethers.getDefaultProvider("mainnet");
        const balance = await provider.getBalance(walletAddress);
        setData({
          ...data,
          balance: balance,
          publicKey: wallet.publicKey,
          error: false,
        });
      } else {
        setData({ ...data, error: true });
      }
    } catch (error) {
      setData({ ...data, error: true });
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
        margin: "50px",
      }}
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          {isLoggedIn && (
            <>
              <Typography
                fontSize="16px"
                marginBottom="10px"
                textAlign="center"
                fontWeight={500}
              >
                Address
              </Typography>
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.06)",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  wordBreak: "break-all",
                }}
              >
                {walletAddress}
              </Box>
              <Typography
                fontSize="16px"
                marginTop="10px"
                marginBottom="10px"
                textAlign="center"
                fontWeight={500}
              >
                Public Key
              </Typography>
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.06)",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  wordBreak: "break-all",
                }}
              >
                {data.publicKey}
              </Box>
              <Box
                sx={{
                  color: "black",
                  fontSize: "32px",
                  fontWeight: "500",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {ethers.utils.formatEther(data.balance)} ETH
              </Box>
            </>
          )}

          {!isLoggedIn && (
            <>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="filled"
                placeholder="Password"
                fullWidth
                margin="dense"
                type="password"
                name="password"
                onChange={handlePass}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1 }}
                  onClick={checkPass}
                >
                  Login
                </Button>
              </Box>
              <Box></Box>
              {data.error && (
                <Typography
                  fontSize="16px"
                  marginTop="10px"
                  textAlign="center"
                  fontWeight={500}
                  color="red"
                >
                  Wrong Password
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Account;
