import React,{useEffect,useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CheckedContext} from "./index"
import If from 'react-control-statements/dist/If';

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
  const [open, setOpen] = useState(false);
  const [Translators,setTranslators]= useState();
  
  //cHECKBOXES
const[check, setCheck]=useContext(CheckedContext);

  const handleChange = (ID) => event => {
    
    setCheck({...check,[ID]:event.target.checked});
   
    console.log(check);
  }
 
  
  useEffect(() => {  
    const fetchData = async() => {

      console.log("IN TRANS")
        
            fetch( ` http://104.238.102.6/~yildirim/quran.com/api/api/options/translations`)
            .then(res =>res.json())
            .then(dat=> setTranslators(dat)); 
          

      
      }
     fetchData();
  
    },[check]);

    function handleClick(){
      setOpen(!open);
    }
    
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    
 {/* translations */}
 <ListItem button onClick={handleClick} style={color}>
        <ListItemIcon style={color} >
        <i class="fas fa-list"></i>
        </ListItemIcon>
        <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>Translations </Typography>}/>
        {open ? <ExpandLess/>: <ExpandMore/>}
      </ListItem>
      
      
      {/* TRASNLATORS LIST */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>     
        
          
         {(Translators)?Translators.translations.map((translator,index)=>
     
                <ListItem button className={classes.nested}>
                  
          
                        <FormControlLabel
                          control={
                          <Checkbox 
                          checked={check[translator.id]}                   
                          onChange={handleChange(translator.id)} 
                          value={`checked${translator.id}`} />
                                        }
                          label={translator.name}
                          
                        />
                      
                    
                     
         </ListItem>
          ):<div class="wraper_laader">
          <div class="loader loadersmall"></div>
        </div>}

 
         </List>
      </Collapse>
    </List>
  );
}

