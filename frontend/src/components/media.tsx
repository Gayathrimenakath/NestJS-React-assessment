import { Article } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { MediaType } from "../interfaces/project";

export const Media = (props: { mediaProp: MediaType }) => {
  return (
    <Card sx={{ width: 180, mt: 1 }}>
      <CardMedia
        component={() => (
          <Box
            height={60}
            width={"100%"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Article fontSize="large" />
          </Box>
        )}
      />
      <CardContent>
        <Typography variant="subtitle1" noWrap>
          {props.mediaProp.name.split(".")[0]}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.mediaProp.type}
        </Typography>
      </CardContent>
    </Card>
  );
};
