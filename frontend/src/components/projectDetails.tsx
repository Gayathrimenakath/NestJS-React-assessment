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
import { AddAssets } from "./AddAssets";
import { Media } from "./media";
import { AddCustomField } from "./AddCustomField";

export const ProjectDetailsPage = () => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenCustomField, setIsOpenCustomField] = useState<boolean>(false);

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
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 0, mb: 1, width: "100%" }} disableGutters>
      {projectDetails ? (
        <Box sx={{ width: "100%" }}>
          {isOpen && (
            <AddAssets
              open={isOpen}
              projectID={projectDetails.id}
              setProjectDetails={setProjectDetails}
              onClose={setIsOpen}
            />
          )}
          {isOpenCustomField && (
            <AddCustomField
              open={isOpenCustomField}
              projectID={projectDetails.id}
              setProjectDetails={setProjectDetails}
              onClose={setIsOpenCustomField}
            />
          )}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
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
              <Typography variant="body1">
                {projectDetails.description}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Box
                display={"flex"}
                width={"15%"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
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
                    <Media mediaProp={doc} assetType={"Document"} />
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
                      <Media mediaProp={photo} assetType={"Photo"} />
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
                      <Media mediaProp={video} assetType={"Video"} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2">No videos available.</Typography>
              )}
            </Box>

            <Box sx={{ mt: 4 }}>
              <Box
                display={"flex"}
                width={"25%"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                {" "}
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Custom Fields
                </Typography>{" "}
                <Button onClick={() => setIsOpenCustomField(true)}>
                  <Add color="primary" />
                </Button>
              </Box>

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
                        <Typography variant="subtitle1">
                          {field.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <p>No custom fields available.</p>
              )}
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {error ? (
            <Typography color="error">Error Found: {error}</Typography>
          ) : loading ? (
            <Typography>Loading details...</Typography>
          ) : (
            <Typography>No details found</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};
