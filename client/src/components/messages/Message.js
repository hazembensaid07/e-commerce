import { Button, CardHeader, Grid } from '@material-ui/core';
import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'
import {red} from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
    alignItems:'center'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
      height:10,
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  media: {
    height: '10rem',
    width:  '10rem'
  },
  avatar: {
    backgroundColor: red[500],
  },
  center: {
    textAlign:'center'
  },
}));

const SLink = styled(Link)`
color:black;
text-decoration: none
`
const Message = ({message}) =>{
    const classes = useStyles();
    return(
      

        <Card className={classes.root}>
         <CardHeader 
  avatar={
      <Avatar aria-label="recipe" className={classes.avatar}  src={`http://localhost:5000/${message.user.imgSrc}`}>
      </Avatar>}
          title= {message.user.username}    
          subheader={`${message.createdAt.substring(12, 16)} / ${message.createdAt.substring(0, 10)} `}

          action={<Button  aria-controls="fade-menu" aria-haspopup="true">
          <MoreVertIcon />
          </Button>}
        />
       <h4>{message.message}</h4>
       
      </Card>

    )

}

export default Message;