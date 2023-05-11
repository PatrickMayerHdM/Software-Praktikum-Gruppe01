import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FavoriteProfileBox from "./FavoriteProfileBox";

/** Dies ist eine Test Seite, zum darstellen mehrerer FavoriteProfileBoxen innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt. */

function TestFavoriteProfileList(){


    return(
        <Box sx={{ width: {lg: '60%', md: '70%', sm: '90%'},  margin: '0 auto'}} >
          <Grid container spacing={2}
            justifyContent="center"  >
            <Grid item xs={12} >
              <Item>
                  <FavoriteProfileBox/>
              </Item >
            </Grid >
            <Grid item xs={12} >
              <Item>
                  <FavoriteProfileBox/>
              </Item >
            </Grid >
            <Grid item xs={12} >
              <Item>
                  <FavoriteProfileBox/>
              </Item >
            </Grid>
          </Grid >
        </Box >
        )
}
export default TestFavoriteProfileList