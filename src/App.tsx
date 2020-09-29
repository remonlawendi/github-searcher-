import React from 'react';
import { reset } from 'styled-reset'
import { createGlobalStyle } from 'styled-components'
import { Header } from './Components/Header';
import { SearchResults } from './Components/SearchResults';
import { SearchInput } from './Components/SearchInput';
const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  button::-moz-focus-inner {
    border: 0;
  }
  * {
    font-family: IBM Plex Mono;
  }
  .App {
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
  `

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <SearchInput />
      <SearchResults />
    </div>
  );
}

export default App;
