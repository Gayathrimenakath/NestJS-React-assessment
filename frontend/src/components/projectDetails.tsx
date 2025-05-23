import { useEffect, useState } from "react";
import type { Link, ProjectDetails } from "../interfaces/project";
import {
  Box,
  Container,
  Grid,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

export const ProjectDetailsPage = () => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects/1");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ProjectDetails = await response.json();
      setProjectDetails(data);
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return error ? (
    <Box>Error Found: {error}</Box>
  ) : loading ? (
    <Box>Loading details</Box>
  ) : projectDetails ? (
    <Container sx={{ mt: 0, mb: 1,  width: "100%" }}  disableGutters >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Grid
            container
            sx={{
              fontWeight: "bold",
              pb: 1,
              borderBottom: "2px solid #ccc",
              width: "100%",
            }}
          >
            <Grid size={3}>Status</Grid>
            <Grid size={3}>Booking Date</Grid>
            <Grid size={3}>Booking ID</Grid>
            <Grid size={3}>Customer Ref</Grid>
          </Grid>

          <Grid
            container
            key={projectDetails.bookingId}
            component={Paper}
            sx={{ my: 1, p: 1, alignItems: "center" }}
          >
            <Grid size={3}>{projectDetails.status}</Grid>
            <Grid size={3}>{projectDetails.bookedDate}</Grid>
            <Grid size={3}>{projectDetails.bookingId}</Grid>
            <Grid size={3}>{projectDetails.customerRef}</Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">{projectDetails.description}</Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Links</Typography>
          {projectDetails.links && projectDetails.links.length > 0 ? (
            <List dense sx={{ paddingTop: "1px" }}>
              {projectDetails.links.map((link: Link, index: number) => (
                <ListItem key={index} sx={{ paddingLeft: "2px" }}>
                  <ListItemText
                    primary={
                      <MuiLink href={link.url} target="_blank">
                        {link.name}
                      </MuiLink>
                    }
                    secondary={link.url}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No links available.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  ) : (
    <Box>No details found</Box>
  );
};
