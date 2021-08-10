import { IconButton } from '@material-ui/core';

import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/More';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import HouseIcon from '@material-ui/icons/House';

import React from 'react';
import styles from './styles';

import Drawer from '@material-ui/core/Drawer';

import SideMenu from '../SideMenu';

export default function InfoIconButton({
  classes,
  participants,
  room,
  localParticipant
}) {
  const titleToolTip = 'Meeting Info';
  const localClasses = styles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(!state);
  };

  return (
    <div>
      <Tooltip title={titleToolTip} aria-label="add">
        <IconButton
          onClick={toggleDrawer()}
          edge="start"
          color="inherit"
          aria-label="mic"
          className={localClasses.infoButton}
        >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        <SideMenu
          room={room}
          participants={participants}
          localParticipant={localParticipant}
        ></SideMenu>
      </Drawer>
    </div>
  );
}
