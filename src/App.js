import React from 'react';
import Summarizer from './components/summarizer'
import Blog from './components/blog';
import { Navbar } from 'react-bootstrap';
import GithubCorner from 'react-github-corner';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
          <img
            alt="logo"
            src="https://media.discordapp.net/attachments/773409342585962497/775267637969289226/mountains.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <GithubCorner href="https://github.com/dotrachit/summit" target="blank" />
      </Navbar>
      <Summarizer />
      <Blog />
    </div>
  );
}

export default App;
