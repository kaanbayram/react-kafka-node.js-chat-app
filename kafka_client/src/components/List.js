import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto', //360
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function PinnedSubheaderList(props) {
  const classes = useStyles();
  var items = [];
  items = props.items;

  return (
    <List className={classes.root} subheader={<li />}  style={styles.listbox}>
      
          <ul className={classes.ul}>
            {items.map(item => (
              <ListItem>
                <ListItemText primary={`${item}`} />
              </ListItem>
            ))}
          </ul>
       
    </List>
  );
}

const styles={
  listbox:{
    //borderRadius: '20px 20px 20px 20px',
    height:'200px'
  }
}