import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  connector.createSession();
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    console.error("Connection error:", error);
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
  console.log("Connected accounts:", accounts);
  console.log("Connected chainId:", chainId);
});

connector.on("session_update", (error, payload) => {
  if (error) {
    console.error("Session update error:", error);
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
  console.log("Updated accounts:", accounts);
  console.log("Updated chainId:", chainId);
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    console.error("Disconnect error:", error);
    throw error;
  }

  console.log("Disconnected");
});

// Log connection attempt
connector.on("connect_attempt", (attempt) => {
  console.log("Attempting to connect:", attempt);
});
