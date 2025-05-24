import {
  Alert,
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
  const [errorMessage, setErrorMessage] = useState<string>("");

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

      props.setProjectDetails((prev) =>
        prev ? { ...prev, links: [...prev.links, newLink] } : prev
      );

      handleReset();
      props.onClose(false);
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setNewName("");
    setNewURL("");
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
              onChange={(e) => {
                setErrorMessage("");
                setNewName(e.target.value);
              }}
            />
            <TextField
              label=" URL"
              variant="outlined"
              size="small"
              value={newURL}
              onChange={(e) => {
                setErrorMessage("");
                setNewURL(e.target.value);
              }}
            />
            {errorMessage && (
              <Alert
                severity="error"
                onClose={() => {
                  handleReset();
                  setErrorMessage("");
                }}
              >
                {errorMessage}
              </Alert>
            )}

            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                disabled={errorMessage !== "" || !newName || !newURL}
                onClick={addNewLink}
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
