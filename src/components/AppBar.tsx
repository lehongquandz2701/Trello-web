import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightness from "@mui/icons-material/SettingsBrightness";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Tooltip,
  useColorScheme,
} from "@mui/material";
import SelectAutoWidth from "./SelectAutoWidth";
import { useCallback, useState } from "react";
import { TrelloLogo } from "~/assets/icons";
import BasicMenu from "./Menu";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { signOut } from "~/libs/firebase";
import { useNavigate } from "react-router";

const dataOption = [
  {
    value: "light",
    title: "Light",
    icon: <LightModeIcon fontSize="small" />,
  },
  {
    value: "dark",
    title: "Dark",
    icon: <DarkModeIcon fontSize="small" />,
  },
  {
    value: "system",
    title: "System",
    icon: <SettingsBrightness fontSize="small" />,
  },
];

const AppBar = () => {
  const { setMode, mode } = useColorScheme();
  const route = useNavigate();

  const toggleMode = useCallback(
    (event: SelectChangeEvent) => {
      setMode(event.target.value as any);
    },
    [setMode, mode]
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    route("/login");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.spacingCustom.header,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppsIcon />
        <TrelloLogo />

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            gap: 1,
          }}
        >
          <BasicMenu title="Workspaces" />
          <BasicMenu title="Recent" />
          <BasicMenu title="Templates" />
          <Button startIcon={<LibraryAddIcon />} size="small" color="inherit">
            Create
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          id="outlined-search"
          label="Search..."
          type="search"
          sx={{ minWidth: 120 }}
        />
        <SelectAutoWidth
          key={mode}
          initValue={mode as string}
          onSelect={toggleMode}
          dataOption={dataOption}
        />
        <Tooltip title="Notifications" arrow>
          <Badge sx={{ cursor: "pointer" }} color="secondary" variant="dot">
            <NotificationsOutlinedIcon />
          </Badge>
        </Tooltip>

        <Tooltip sx={{ cursor: "pointer" }} title="Help" arrow>
          <HelpOutlineRoundedIcon />
        </Tooltip>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AppBar;
