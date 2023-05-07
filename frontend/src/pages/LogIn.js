import React, { Component } from 'react';
import { Button, Grid, Typography } from '@mui/material';

/** Definition der LogIn-Komponente als eine Unterklasse von Component */
class LogIn extends Component {

	/** Funktion, die aufgerufen wird, wenn der "Anmelden"-Button geklickt wird */
	handleLogInButtonClicked = () => {
		/** Aufrufen der onLogIn-Funktion, die als Prop an die Komponente übergeben wurde */
		this.props.onLogIn();
	}

	/** Funktion zum Rendern der JSX-Elemente der Komponente */
	render() {
		return (
			<div>
				<Typography sx={{margin: 5}} align='center' variant='h4'>Willkommen zur HdM React/Python
					Projektvorstellung</Typography>
				<Typography sx={{margin: 4}} align='center'>Bitte melden Sie sich an, um die Dienste der HdM Dating
					Seite nutzen zu können.</Typography>
				<Grid container justifyContent='center'>
					<Grid item>
						<Button variant='outlinedPrimary' color='secondary' sx={{backgroundColor: '#FF4D4F'}}
								onClick={this.handleLogInButtonClicked}>
							Mit Google anmelden
						</Button>
					</Grid>
				</Grid>
			</div>
			);
	}
}

/** Exportieren der LogIn-Komponente, um sie in anderen Teilen der Anwendung verwenden zu können */

export default LogIn;
