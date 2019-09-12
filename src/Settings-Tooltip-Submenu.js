import React, {useContext} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {TranslitContext} from "./index";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


const color={
    color: '#ABABAB'
  };
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [TranslitShowing, setTrans]=useContext(TranslitContext);
  const [selectedValue, setSelectedValue] = React.useState('a');

  function handleRadioChange(event) {
    setSelectedValue(event.target.value);
  }
  function handleClick() {
    setOpen(!open);
  }
  

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    
   {/* TOOLTIP DISPLAY */}
      <ListItem button onClick={handleClick} style={color}>
        <ListItemIcon style={color} >
        <i class="fas fa-globe-americas"></i> 
        </ListItemIcon>
        <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>Tooltip </Typography>}/>
        {open ? <ExpandLess/>: <ExpandMore/>}
      </ListItem>
      {/* Tooltip LIST */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

  {/* Tranlsation */}
          <ListItem button className={classes.nested} onClick={()=>setTrans(false)}>
          <Radio 
           onChange={handleRadioChange}
           value="a"
           checked={selectedValue === 'a'}
           color="default"
          />
            <ListItemIcon>
             </ListItemIcon>
            <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>Translations</Typography>} />
          </ListItem>

{/* Tranliteration */}
         
        
       <ListItem  className={classes.nested} onClick={()=>{setTrans(true); console.log("Transliteration SHowing")} }>
       <Radio 
           button onChange={handleRadioChange}
           value="b"
           checked={selectedValue === 'b'}
           color="default"
           
      />
            <ListItemIcon>
      
             </ListItemIcon>
            <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>Transliteration</Typography>} />
          
          </ListItem>

        </List>
      </Collapse>
    </List>
  );
}

