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
import {TranslitContext} from "./Store";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {FormattedMessage} from "react-intl";


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
        <i className="fas fa-globe-americas"></i> 
        </ListItemIcon>
        <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}><FormattedMessage id="Tooltip"/> </Typography>}/>
        {open ? <ExpandLess/>: <ExpandMore/>}
      </ListItem>
      {/* Tooltip LIST */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

  {/* Tranlsation */}
          <ListItem button className={classes.nested} onClick={()=>setTrans(false)}>
            
          <FormControlLabel
                          control={
                          <Radio
                          checked={!TranslitShowing}                   
                           />
                                  }
                          label="Translations"
                          color="default"
                          
                        />

          </ListItem>

       <ListItem  className={classes.nested} onClick={()=>{setTrans(true);} }>
       <FormControlLabel
                          control={
                          <Radio checked={TranslitShowing}/>
                                  }
                          label="Transliteration"
                          color="default"
                          
                        />
          
          </ListItem>

        </List>
      </Collapse>
    </List>
  );
}

