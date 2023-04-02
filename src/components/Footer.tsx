import React, { PropsWithChildren, useState } from 'react';
import {
    BottomNavigation,
    Paper,
    BottomNavigationAction,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

interface Props {

}



const Footer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
    const [bottomOption, setBottomOption] = useState(0);


    return (
<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
<BottomNavigation
  showLabels
  value={bottomOption}
  onChange={(event, newValue) => {
    setBottomOption(newValue);
  }}
>
  <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
</BottomNavigation>
</Paper>
    );
};

export default Footer;