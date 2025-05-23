import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Link, ProjectDetails } from "../interfaces/project";
import { Media } from "./media";
import { ModalWrapper } from "./ModalWrapper";

export const ProjectDetailsPage = () => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState<string>("");
  const [newURL, setNewURL] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const addNewLink = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/projects/${projectDetails?.id}/newLink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName, url: newURL }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const newLink = await response.json();
      setProjectDetails((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          links: [...prevProject.links, newLink],
        };
      });
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
    }
  };

  return error ? (
    <Box>Error Found: {error}</Box>
  ) : loading ? (
    <Box>Loading details</Box>
  ) : projectDetails ? (
    <Container sx={{ mt: 0, mb: 1, width: "100%" }} disableGutters>
      {isOpen && (
        <ModalWrapper
          open={isOpen}
          newName={newName}
          setNewName={setNewName}
          newURL={newURL}
          setNewURL={setNewURL}
          onClose={setIsOpen}
          handleSubmit={addNewLink}
        />
      )}
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
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">{projectDetails.description}</Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            {" "}
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Links
            </Typography>{" "}
            <Button onClick={() => setIsOpen(true)}>
              <Add color="primary" />
            </Button>
          </Box>

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

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Documents
          </Typography>
          <Grid container flexDirection="row" spacing={2}>
            {projectDetails.documents.map((doc) => (
              <Grid key={doc.id}>
                <Media mediaProp={doc} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Photos
          </Typography>
          {projectDetails.photos && projectDetails.photos.length > 0 ? (
            <Grid container flexDirection="row" spacing={2}>
              {projectDetails.photos.map((photo) => (
                <Grid key={photo.id}>
                  <Media mediaProp={photo} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2">No videos available.</Typography>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Videos
          </Typography>
          {projectDetails.videos && projectDetails.videos.length > 0 ? (
            <Grid container flexDirection="row" spacing={2}>
              {projectDetails.videos.map((video) => (
                <Grid key={video.id}>
                  <Media mediaProp={video} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2">No videos available.</Typography>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Custom Fields
          </Typography>

          {projectDetails.customFields &&
          projectDetails.customFields.length > 0 ? (
            <Box
              display={"flex"}
              width={"50%"}
              flexDirection={"column"}
              pb={"5px"}
              pt={"5px"}
            >
              {projectDetails.customFields.map((field, index) => (
                <Box
                  key={index}
                  width={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <Box width={"50%"}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {field.key}
                    </Typography>
                  </Box>
                  <Box width={"50%"}>
                    <Typography variant="subtitle1">{field.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <p>No custom fields available.</p>
          )}
        </Box>
      </Paper>
    </Container>
  ) : (
    <Box>No details found</Box>
  );
};
