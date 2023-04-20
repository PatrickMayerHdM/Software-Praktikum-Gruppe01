import {createTheme, styled} from '@mui/material/styles';
import { colors } from '@mui/material';
import Paper from "@mui/material/Paper";


const white = '#FFFFFF';
const black = '#000000';

/*
const für das Item Element des Grids in ProfilePreview
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default Item;

//custom theme for this app
/*in der Render Methode in App.js ist dann ((vgl. Bankprojekt Video 3))
* render() {
		const { currentUser, appError, authError, authLoading } = this.state;
		// console.log(currentUser)

		return (
			<ThemeProvider theme={Theme}> (greift auf das globale CSS zu, um einheitliches Styling zu ermöglichen*/