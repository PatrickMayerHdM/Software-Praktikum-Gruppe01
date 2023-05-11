import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./Profilebox";

/** Dies ist eine Test Seite, zum darstellen mehrerer Profileboxen innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt. */

function TestProfileList(){


    return(
        <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'},  margin: '0 auto', border: 1}} >
          <Grid container spacing={2}
            justifyContent="center"  >
            <Grid item xs={12} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
            <Grid item xs={12} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
            <Grid item xs={12} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid>
          </Grid >
        </Box >
        )
}
export default TestProfileList