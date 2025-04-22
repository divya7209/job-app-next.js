import { Backdrop, CircularProgress } from "@mui/material";
/**
 * common component loader
 * @returns 
 */
const Loading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 100 }}
      open={true}
      data-testid="backdrop"
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;

