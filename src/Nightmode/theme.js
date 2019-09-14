import { grey } from "@material-ui/core/colors";

const white = "#FFFFFF";
const black = "#161617";
const gray = "#F8F8F9";

const themeLight = {
  background: gray,
  body: black,
  Arabic: black,
  quicklink:grey,
};

const themeDark = {
  background: black,
  body: white,
  Arabic: white,
  quicklink:grey,
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;
