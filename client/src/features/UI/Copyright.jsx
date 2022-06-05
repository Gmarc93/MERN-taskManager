import {Typography} from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'TaskManager © '} {new Date().getFullYear()}
    </Typography>
  );
}
