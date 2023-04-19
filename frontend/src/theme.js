import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';

//custom theme for this app
/*in der Render Methode in App.js ist dann ((vgl. Bankprojekt Video 3))
* render() {
		const { currentUser, appError, authError, authLoading } = this.state;
		// console.log(currentUser)

		return (
			<ThemeProvider theme={Theme}> (greift auf das globale CSS zu, um einheitliches Styling zu ermöglichen*/