import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const FadeDisplay = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #6B58B8 0%, #DA93D3 100%)",
  fontFamily: "Space Mono",
  fontSize: 18,
  borderRadius: 50,
  fontWeight: 600,
  height: 35,
  padding: 15,
  width: "auto",
}));
export default FadeDisplay;
