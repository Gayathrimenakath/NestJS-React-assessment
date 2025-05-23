import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { ProjectDetails } from "../interfaces/project";

export const AddAssets = (props: {
  open: boolean;
  projectID: string;
  setProjectDetails: React.Dispatch<
    React.SetStateAction<ProjectDetails | null>
  >;
  onClose: (arg0: boolean) => void;
}) => {
  const [newName, setNewName] = useState<string>("");
  const [newURL, setNewURL] = useState<string>("");

  const addNewLink = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/projects/${props.projectID}/newLink`,
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
      props.setProjectDetails((prevProject: ProjectDetails | null) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          links: [...prevProject.links, newLink],
        };
      });
      props.onClose(false);
    } catch (error) {
      props.onClose(false);
    }
  };

  const handleSubmit = () => {
    addNewLink();
    props.onClose(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Paper>
      {" "}
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">Add New Link</Typography>
            <TextField
              label=" Name"
              variant="outlined"
              size="small"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextField
              label=" URL"
              variant="outlined"
              size="small"
              value={newURL}
              onChange={(e) => setNewURL(e.target.value)}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                onClick={() => handleSubmit()}
                sx={{ alignSelf: "flex-start" }}
              >
                Add Link
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => props.onClose(false)}
                sx={{ alignSelf: "flex-start" }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};
