import { Card, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Container } from 'reactstrap';
import React, { useState } from 'react'

function Summarizer() {
    const [mediumData, setMediumData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let [link, setLink] = useState('');
    const [cardData, setCardData] = useState({});
    const [summarizedData, setSummarizedData] = useState({});
    const axios = require('axios');
    let personUsername = '';
    let forwardSlashIndex = 0;
    let inputURL = '';
    const submitHandler = (e) => {
        e.preventDefault()
        if (link.startsWith('https://medium.com/')) {
            link = link.replace('https://medium.com/', '')
        }
        forwardSlashIndex = link.indexOf('/')
        personUsername = link.slice(1, forwardSlashIndex)
        console.log("the username of the blog's author is: " + personUsername)
        inputURL = `https://medium.com/${link}`
        console.log("the URL of the blog being summarized is: " + inputURL)
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${personUsername}`)
            .then(res => res.json())
            .then(response => {
                setMediumData(response.items);
                setIsLoading(false);
                const finalData = response.items.slice(0, 6);
                for (var i in finalData) {
                    if (finalData[i].link.startsWith(inputURL)) {
                        setCardData({
                            url: inputURL,
                            status: finalData.status,
                            title: finalData[i].title,
                            content: (finalData[i].content).replace(/"/g, "").replace(/“/g, "").replace(/”/g, "")
                        });
                        let data = JSON.stringify({ data: cardData.content });
                        axios.post('https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/', data, { headers: { "Content-Type": "application/json" } })
                            .then(response => {
                                setSummarizedData({
                                    content: response.data,
                                    status: response.status
                                })
                            })
                            .catch(error => {
                                console.log(error);
                            });;
                    }
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="App">
            <Container className="align-items-left">
                <Form onSubmit={submitHandler}>
                    <InputGroup className="mb-3 mt-5" size="lg" type="submit">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter the Medium blog link here" />
                        <InputGroup.Append>
                            <Button type="submit" variant="dark">Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <Card className="text-md-left">
                    <Card.Header as="h5">
                        {summarizedData.status === 200 ? cardData.title : "Heading"}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {summarizedData.status === 200 ? summarizedData.content : "This is where you'll see your summarized content!"}
                        </Card.Text>
                        {summarizedData.status === 200 ? <Button href={link} variant="dark" target="_blank">Check original blog</Button> : ''}
                    </Card.Body>
                </Card>
            </Container>
        </div >
    );
}

export default Summarizer;
