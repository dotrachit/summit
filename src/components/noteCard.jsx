import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function NoteCard() {
  return (
    <Card border="dark" style={{ width: '18rem' }} className="m-4">
    <Card.Header>9th November 2020</Card.Header>
    <Card.Body>
      <Card.Title>Standup meeting - 01</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  );
}