import {createTheme , styled} from '@mui/material/styles';
import { colors } from '@mui/material';
import Paper from '@mui/material/Paper';

const white = '#FFFFFF';
const black = '#000000';

/*const für das Item Element des Grids in ProfileWindow */
const Item = styled(Paper)(({ theme }) => (
    {
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ececec', ...theme.typography.body2,
  padding: theme.spacing(2), textAlign: 'center', color:  black,
})
);

export default Item;
