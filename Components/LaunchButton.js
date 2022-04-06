import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const LaunchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #6B58B8 0%, #DA93D3 100%)',
  fontFamily: 'Space Mono',
  fontSize: 20,
  borderRadius: 60,
  fontWeight: 700,
  width: 131,
  maxHeight: 55,
}));

export default LaunchButton;
