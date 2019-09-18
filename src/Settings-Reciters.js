import React,{useEffect,useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {ReciterContext} from "./index"

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
  const [Reciters, setReciters] = useState();
  const [ActiveReciter,setActive] = useContext(ReciterContext)
  
 
  useEffect(() => {  
    const fetchData = async() => {

      console.log("IN TRANS")
        
            fetch( ` http://104.238.102.6/~yildirim/quran.com/api/api/options/recitations`)
            .then(res =>res.json())
            .then(dat=> setReciters(dat)); 
          

      
      }
     fetchData();
  
    },[]);

  function handleClick() {
    setOpen(!open);
  }
  
  const handleChange = (ID) => {
    
   setActive(ID);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {/* Reciters */}
      <ListItem button onClick={handleClick} style={color}>
        <ListItemIcon style={color} >
        <i className="fas fa-microphone"/>
        </ListItemIcon>
        <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>Reciters </Typography>}/>
        {open ? <ExpandLess/>: <ExpandMore/>}
      </ListItem>
      {/* RECITERS LIST */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* MAPPING STARTS */}
        {(Reciters)?Reciters.recitaitons.map((reciter)=>
          <ListItem button className={classes.nested} onClick={()=>handleChange(reciter.id)}> 
          <ListItemIcon>
          <Radio 
          checked={(ActiveReciter===reciter.id)? true: false}
           color="default" />
        </ListItemIcon>
        
      <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>{reciter.reciter_name_eng} </Typography>} />

        </ListItem>):<div class="wraper_laader">
          <div class="loader loadersmall"></div>
        </div>}
        </List>
      </Collapse>
  
    
    </List>
  );
}

