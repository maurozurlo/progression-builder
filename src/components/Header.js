import React from 'react';
import styled from 'styled-components';

import logo from '../img/pb-logo.svg';

const LogoContainer = styled.div`
  display: grid;
  
  border: 3px solid var(--black);
  grid-template-columns: 20% auto;
  font-size: .8rem;

  & > h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    align-self: center;
    justify-self: center;
    text-align: center;
  }

  @media (max-width: 600px) {
    font-size: .7em;
  }
`

const InfoContainer = styled.div`
  background-color: var(--black);
  max-width: var(--max-width);
  margin: 0 auto;
  border: 3px solid var(--black);
  padding: 2px 5px;
  font-size: .9rem;

  small,small>a{
    color: var(--primary);
    text-decoration: none;
  }

  small:nth-of-type(2){
    float: right;
  }
  `
const Header = () => {
  return <header>
    <LogoContainer>
      <img src={logo} alt="App logo"/>
      <h1>Progression<br/>  Builder</h1>
    </LogoContainer>
    <InfoContainer>
    <small>v0.2</small>
      <small>by <a href="maurozurlo.com">ElMiauro</a></small>
    </InfoContainer>
  </header>;
}

export default Header;