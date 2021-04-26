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
import {ReciterContext,URLContext,LoadingContext} from "./Store"
import {FormattedMessage} from "react-intl";
import { async } from 'q';

const color={
    color: '#747474'
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
  const [Reciters, setReciters] = useState({recitaitons:[]});
  const [ActiveReciter,setActive] = useContext(ReciterContext)
  const [URL,setURL] = useContext(URLContext)

  const [isLoading, setLoading] = useContext(LoadingContext);
 
  useEffect(() => {  
     setRecitersForMenu();
  
    },[URL]);

    const setRecitersForMenu = async()=>{
      let recitors = await sessionStorage.getItem('RecitersInSession',null);
      recitors = JSON.parse(recitors);
      const fetchData = async() => {
         
        fetch( ` ${URL}options/recitations`)
        .then(res =>res.json())
        .then(dat=> setReciters(dat)); 
      }

      if(recitors!= null){
        setReciters(recitors)
      }
      else{
        fetchData();
      }
      
    }

    useEffect(()=>{
        if(Reciters.recitaitons.length>0)
        {sessionStorage.setItem('RecitersInSession',JSON.stringify(Reciters));}
     },[Reciters])
 

  function handleClick() {
    setOpen(!open);
  }
  
  const handleChange = (ID) => {
    
   setActive(ID);
   setLoading(true);
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
        <ListItemText primary={<Typography style={{ color: '#747474', marginLeft:"-20px" }}><FormattedMessage id="Reciters"/> </Typography>}/>
        {open ? <ExpandLess/>: <ExpandMore/>}
      </ListItem>
      {/* RECITERS LIST */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* MAPPING STARTS */}
        {(Reciters)?Reciters.recitaitons.map((reciter,index)=>
          <ListItem button className={classes.nested} onClick={()=>handleChange(reciter.id)} key={index}> 
          <ListItemIcon>
          <Radio 
          checked={(ActiveReciter===reciter.id)? true: false}
           color="default" />
        </ListItemIcon>
        
      <ListItemText primary={<Typography style={{ color: '#ABABAB', marginLeft:"-20px" }}>{reciter.reciter_name_eng}
      {(reciter.style)? "(" + reciter.style+ ")":""} </Typography>} />

        </ListItem>):<div className="wraper_laader">
          <div className="loader loadersmall"></div>
        </div>}
        </List>
      </Collapse>
  
    
    </List>
  );
}

