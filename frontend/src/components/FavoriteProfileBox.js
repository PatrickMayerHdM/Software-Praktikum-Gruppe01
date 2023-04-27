import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./Profilebox";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

/** Da in der konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen entfernen Knopf an.
 * Dies soll später ermöglichen andere Personen, wieder von der Kontaktsperre zu nehmen.*/

function FavoriteProfileBox(){
    return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={5} spacing={2}>
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
            <Grid item xs={1} spacing={2}>
                <ItemAsk>
                    Kontaktanfrage
                </ItemAsk>
            </Grid>
            <Grid xs={1} spacing={2}>
                <ItemDel>
                    Von Merkzettel
                    Entfernen
                </ItemDel>
            </Grid>

          </Grid >
        </Box >
        )

}

const ItemDel = styled(Paper)(({ theme }) => (
    {
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e63946', ...theme.typography.body2,
  padding: theme.spacing(2), textAlign: 'center', color:  '#fff',
})
);

const ItemAsk = styled(Paper)(({ theme }) => (
    {
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#23611d', ...theme.typography.body2,
  padding: theme.spacing(2), textAlign: 'center', color:  '#fff',
})
);

export default FavoriteProfileBox