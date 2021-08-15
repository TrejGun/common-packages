import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

export default makeStyles<Theme>(
  () => ({
    root: {
      position: "relative",
      minHeight: 40,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "rgba(255,255,255,.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  { name: "ProgressOverlay" },
);
