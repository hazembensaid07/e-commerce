import { CardHeader, Grid } from '@material-ui/core';
import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import {red} from '@material-ui/core/colors';
import MessageList from './MessageList';
import AddMessage from './AddMessage';
import { isAuth } from '../auth/helpers';
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
const Chat = () =>{
    const classes = useStyles();
    return(
            <Grid container >
              {isAuth() ?  null : <Redirect to="/signin" />}
                <Grid item xs={1} md={4}></Grid>
                <Grid item xs={10} md={4}>
                  <AddMessage/>
                  <MessageList/></Grid>
                <Grid item xs={1} md={4}></Grid>
            </Grid>

            
    )

}

export default Chat;