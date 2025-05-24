import { Article, Photo, PlayCircleFilledWhite } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { AssetType, MediaType } from "../interfaces/project";

export const Media = (props: {
  mediaProp: MediaType;
  assetType: AssetType;
}) => {
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
            {props.assetType === "Document" ? (
              <Article fontSize="large" />
            ) : props.assetType === "Photo" ? (
              <Photo fontSize="large" />
            ) : (
              <PlayCircleFilledWhite fontSize="large" />
            )}
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
