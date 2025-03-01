import { Avatar, AvatarGroup, Box, Button, Chip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.spacingCustom.tabbar,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "0 15px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={{
            border: "none",
            background: "none",
          }}
          clickable
          icon={<DashboardIcon />}
          label="your  name project"
        />
        <Chip
          sx={{
            border: "none",
            background: "none",
          }}
          clickable
          icon={<VpnLockIcon />}
          label="Public/Private workspaces"
        />
        <Chip
          sx={{
            border: "none",
            background: "none",
          }}
          clickable
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
        />
        <Chip
          sx={{
            border: "none",
            background: "none",
          }}
          clickable
          icon={<BoltIcon />}
          label="Automation"
        />
        <Chip
          sx={{
            border: "none",
            background: "none",
          }}
          clickable
          icon={<FilterListIcon />}
          label="Filter "
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          startIcon={<PersonAddIcon />}
          size="small"
          color="inherit"
          variant="outlined"
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: 30,
              height: 30,
              fontSize: 16,
            },
          }}
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
