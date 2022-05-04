import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {Link} from 'react-router-dom';


const LgButton = styled(Button)`
border:2px solid black;
border-radius: 0px;
color:black;
width:100%;
height:56px;
font-size:15px;
${ ({black}) => black  && `
background-color:black;
color:white;
:hover{
  color:black
}
`}
`;

const SLink = styled(Link)`
text-decoration: none
`
const button = ({black,link="",children,onclick})=> {

  return (
        <div> 
          <SLink to={link}>
            <LgButton black={black} onClick={onclick} variant="outlined" >{children}</LgButton>  
          </SLink>    
          
        </div>


  );
};

export default button;
