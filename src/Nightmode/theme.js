import { grey } from "@material-ui/core/colors";

const white = "#FFFFFF";
const black = "#161617";
const gray = "#F8F8F9";

const themeLight = {
  bodybg:white,
  background: gray,
  body: black,
  Arabic: black,
  quicklink:grey,
  sidebarbg:white,
  transalator:'#56c0d0'
};

const themeDark = {
  bodybg:black,
  background: black,
  body: white,
  Arabic: white,
  quicklink:white,
  sidebarbg:'#464646',
  transalator:'#56c0d0'
};

const theme = mode => (mode === "dark" ? themeDark : themeLight);

export default theme;
