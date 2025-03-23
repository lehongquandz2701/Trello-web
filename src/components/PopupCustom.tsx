import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import {
  ContentCopy,
  ContentCut,
  ContentPaste,
  Delete,
} from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { useDelete } from "~/mutations/useColumn";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey, toastError } from "~/utilities/constant";

const ITEM_HEIGHT = 48;

type PopupCustomProps = {
  columnId: string;
};

export default function PopupCustom({ columnId }: PopupCustomProps) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const deleteColumn = useDelete();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteColumn = React.useCallback(async () => {
    const { confirmed } = await confirm({
      description: `Type "columns" to confirm your action`,
      confirmationKeyword: "columns",
      dialogProps: {
        maxWidth: "xs",
      },
    });

    if (confirmed) {
      deleteColumn.mutate(
        {
          id: columnId,
        },
        {
          onSuccess() {
            queryClient.refetchQueries({ queryKey: [queryKey.getBoards] });
          },
          onError(error: any) {
            toastError(error?.response?.data?.message);
          },
        }
      );
    }
  }, [confirm]);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        <MenuItem
          sx={{
            "&:hover": {
              color: "success.light",
              "& .hover-content-cut": {
                color: "success.light",
              },
            },
          }}
        >
          <ListItemIcon className="hover-content-cut">
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add new card</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleDeleteColumn}
          sx={{
            "&:hover": {
              color: "warning.dark",
              "& .hover-icon": {
                color: "warning.dark",
              },
            },
          }}
        >
          <ListItemIcon className="hover-icon">
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete column</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
