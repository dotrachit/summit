import './App.css';
import NoteCard from './components/noteCard';
import { Card, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function App() {
  return (
    <div className="App">
      <row>
        <Card border="dark" style={{ width: '18rem' }} className="m-4" onClick="dynamicAddNoteCard">
          <Card.Body>
            <Card.Title>Summarize a new note</Card.Title>
            <Button variant="link">
              <Icon.Plus color="#006AEA" size={80} />
            </Button>
          </Card.Body>
        </Card>
        <div>
          <NoteCard />
        </div>
      </row>
    </div>
  );
}

export default App;
