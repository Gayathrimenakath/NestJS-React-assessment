import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const ModalWrapper = (props: {
  open: boolean;
  newName: string;
  setNewName: (arg0: string) => void;
  newURL: string;
  setNewURL: (arg0: string) => void;
  onClose: (arg0: boolean) => void;
  handleSubmit: () => Promise<void>;
}) => {
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
          <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">Add New Link</Typography>
            <TextField
              label=" Name"
              variant="outlined"
              size="small"
              value={props.newName}
              onChange={(e) => props.setNewName(e.target.value)}
            />
            <TextField
              label=" URL"
              variant="outlined"
              size="small"
              value={props.newURL}
              onChange={(e) => props.setNewURL(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => props.handleSubmit()}
              sx={{ alignSelf: "flex-start" }}
            >
              Add Link
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};
