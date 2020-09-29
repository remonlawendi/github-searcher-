import React from 'react'
import styled from 'styled-components'


const Container = styled.header`
  display: flex;
  align-items: end;
  font-family: IBM Plex Sans;
  margin: 20px 0;
`
const GHLogo = styled.img`
  width: 50px;
  border-radius: 300px;
  height: 50px;
`
const Title = styled.h1`
font-size: 18px;
font-weight: 600;
margin: 5px;
`
const SubTitle = styled.h2`
font-size: 16px;
color: #444;
margin-left: 5px;
`

export const Header = () => 
<Container>
  <GHLogo src='./logo.png' />
  <div>
    <Title>GitHub Searcher</Title>
    <SubTitle>Search users or repositories below</SubTitle>
  </div>
</Container>