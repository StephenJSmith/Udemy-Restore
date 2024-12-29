import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar = ({darkMode, toggleDarkMode}: Props) => {

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h6'>RE-STORE</Typography>
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? <DarkMode /> : <LightMode sx={{color: 'yellow'}} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
