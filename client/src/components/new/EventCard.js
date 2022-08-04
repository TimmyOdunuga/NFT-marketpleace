import React from "react";
import { Grid, Fade, Paper, Typography, Divider, Fab, SvgIcon } from "@mui/material";
import { Button } from "@mui/material";

export default function EventCard({ i, loading, item, icon, view, reserve }) {
  return (
    <Grid key={i} item md={view?8:4}>
      <Paper
        variant="outlined"
        sx={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <Fade in={!loading}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            padding={2}
            spacing={2}
          >
            <Grid item xs={8} sm={7} md>
                {icon}
              <Typography textAlign="center" variant="h6">
                {item.eventName}
              </Typography>

              <Grid item xs={12}>
              <Divider sx={{ mb: 1 }} />
            </Grid>
            
              <Typography
                textAlign="center"
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {item.permissions} access
              </Typography>
              <Typography
                textAlign="center"
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Registration {item.requirement[0]}
              </Typography>

              <Typography
                textAlign="center"
                variant="caption"
                color="text.secondary"
                sx={{ mt: 2 }}
                // style={{wordWrap: "break-word",}}
              >
                {item.description}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ mb: 1 }} />
            </Grid>

            <Grid item>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                justifyContent="center"
              >
                {item.date}
              </Typography>
            </Grid>

            {reserve && <Grid item>
              <Button fullWidth onClick={reserve}>
                RSVP
              </Button>
            </Grid>}
          </Grid>
        </Fade>
      </Paper>
    </Grid>
  );
}
