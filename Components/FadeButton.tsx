import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const FadeButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #6B58B8 0%, #DA93D3 100%)",
  fontFamily: "Space Mono",
  fontSize: 20,
  borderRadius: 60,
  fontWeight: 700,
  height: 55,
  padding: 10,
  width: "100%",
}));
export default FadeButton;
