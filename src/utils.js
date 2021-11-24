import CryptoJS from "crypto-js";

export const createAndStoreKeys = (wallet, address, password) => {
  let encryptedPk = CryptoJS.AES.encrypt(
    JSON.stringify(wallet.privateKey),
    password
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
};
