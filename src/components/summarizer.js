import { Card, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Container } from 'reactstrap';
import React, { useState } from 'react'
import Blog from './blog';

function Summarizer() {
    const [mediumData, setMediumData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let [link, setLink] = useState('');
    const [cardData, setCardData] = useState({});
    const [summarizedData, setSummarizedData] = useState({});
    const [displayInt, setDisplayInt] = useState({ blogInt: 0 });
    const [cardEmpty, setCardEmpty] = useState(0)
    const [handlerPath, setHandlerPath] = useState(0)
    const axios = require('axios');
    let personUsername = '';
    let forwardSlashIndex = 0;
    let inputURL = '';
    let summaryLength = 2;

    function shortCall(){
        summaryLength = 0;
        setHandlerPath(1)
        return true
    }

    function mediumCall(){
        summaryLength = 1;
        setHandlerPath(1)
        return true
    }

    function longCall(){
        summaryLength = 2;
        setHandlerPath(1)
        return true
    }
    const submitHandler = (e) => {
        if(handlerPath === 0)
            {
                setCardEmpty(1)
            }
        else
            {
                setCardEmpty(0)
            }
        setHandlerPath(0)
        e.preventDefault();
        if (link.startsWith('https://medium.com/@')) {
            link = link.replace('https://medium.com/', '')
        } else {
            alert('The format of the link should be https://medium.com/@<username>/<post-id>')
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
                        setDisplayInt({
                            blogInt: 1
                        });
                        console.log("blog int: " + displayInt.blogInt)
                        console.log("outputInt: " + displayInt.outputCardInt)
                        setCardData({
                            url: inputURL,
                            status: finalData.status,
                            title: finalData[i].title,
                            content: (finalData[i].content).replace(/"/g, "").replace(/“/g, "").replace(/”/g, "")
                        });
                        let data = JSON.stringify({ data: cardData.content });
                        axios.post(`https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/${summaryLength}`, data, { headers: { "Content-Type": "application/json" } })
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
    console.log("cardEmpty = "+ cardEmpty)
    return (
        <div className="App">
            <Container className="align-items-left">
                <Form onSubmit={submitHandler}>
                    <InputGroup className="mb-3 mt-5" size="lg" type="submit">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter the Medium blog link here" />
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-dark">Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {displayInt.blogInt === 1?<div>
                    <p>Medium article title: <b>{cardData.title}</b></p>
                    <p>Please select the length of the summary below.</p>
                    <Button type="submit" variant="outline-dark" onClick={shortCall} className="mx-1 mb-4">Short</Button>
                    <Button type="submit" variant="outline-dark" onClick={mediumCall} className="mx-1 mb-4">Medium</Button>
                    <Button type="submit" variant="outline-dark" onClick={longCall} className="mx-1 mb-4">Long</Button>
                    </div>: null
                    }
                </Form>
                {displayInt.blogInt === 1 ?
                    <div>
                        <Card className="text-md-left">
                            <Card.Header as="h5">
                                {summarizedData.status === 200 ? cardData.title : "Post Title"}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {cardEmpty === 1? "This is where you'll see your summarized content!": summarizedData.status === 200 ? summarizedData.content : "This is where you'll see your summarized content!"}
                                </Card.Text>
                                {summarizedData.status === 200 ? <div>
                                    <Button className="mx-1" variant="outline-dark" href="/">Go back to home</Button>
                                    <Button href={link} variant="dark" target="_blank" className="mx-1">Check original blog</Button>
                                </div> : null}
                            </Card.Body>
                        </Card>
                    </div>
                    : null}
                {cardData === {} ? null : displayInt.blogInt === 0 ? <Blog /> : null}
            </Container>
        </div >
    );
}

export default Summarizer;
