import {createTheme , styled} from '@mui/material/styles';
import { colors } from '@mui/material';
import Paper from '@mui/material/Paper';

const white = '#FFFFFF';
const black = '#000000';

/*const für das Item Element des Grids in ProfileWindow */
const Item = styled(Paper)(({ theme }) => (
    {
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#BDC2BF', ...theme.typography.body2,
  padding: theme.spacing(2), textAlign: 'center', color:  black,
})
);

export default Item;
//custom theme for this app
/*in der Render Methode in App.js ist dann ((vgl. Bankprojekt Video 3))
* render() {
		const { currentUser, appError, authError, authLoading } = this.state;
		// console.log(currentUser)

		return (
			<ThemeProvider theme={Theme}> (greift auf das globale CSS zu, um einheitliches Styling zu ermöglichen*/