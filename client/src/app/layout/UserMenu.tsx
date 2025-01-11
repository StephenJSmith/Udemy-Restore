import { useState, MouseEvent } from "react";
import { useLogoutMutation } from "../../features/account/accountApi";
import { User } from "../models/user";
import { Button, Divider, Fade,  ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { History, Logout, Person } from "@mui/icons-material";

type Props = {
  user: User;
}

const UserMenu = ({user}: Props) => {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
      <div>
          <Button
              onClick={handleClick}
              color='inherit'
              size='large'
              sx={{fontSize: '1.1rem'}}
          >
              {user.email}
          </Button>
          <Menu
              id="fade-menu"
              MenuListProps={{
                  'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
          >
              <MenuItem>
                  <ListItemIcon>
                      <Person />
                  </ListItemIcon>
                  <ListItemText>My profile</ListItemText>
              </MenuItem>
              <MenuItem>
                  <ListItemIcon>
                      <History />
                  </ListItemIcon>
                  <ListItemText>My orders</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                  <ListItemIcon>
                      <Logout />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
              </MenuItem>
          </Menu>
      </div>
  );}

export default UserMenu;
