import { Fragment, useEffect, useState } from 'react';

// material-ui
import { Divider, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography, Avatar } from '@mui/material';

// project imports
import { useAppSelector } from '../../store';


interface UserListProps {
  setUser: (user: any) => void
  search: string
};

function UserList({ setUser, search }: UserListProps) {
  const [data, setData] = useState([]);
  const { users } = useAppSelector((state: any) => state.chat);


  useEffect(() => {
    if (search) {
      const results = users.filter((row: any) => {
        let matches = true;

        const properties = ['name'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });

      setData(results);
    } else {
      setData(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <List component="nav">
      <Fragment>
        <ListItemButton
          sx={{ pl: 1 }}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography
                  variant="h5"
                  color="inherit"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  081234567890
                </Typography>
                <Typography component="span" color="textSecondary" variant="caption">
                  2h ago
                </Typography>
              </Stack>
            }
            secondary={
              <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  PT Jahanam Sejahtera
                </Typography>
              </Stack>
            }
          />
        </ListItemButton>
        <Divider />
      </Fragment>
    </List>
  );
}

export default UserList;
