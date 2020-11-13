import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Col, Row, CardImg, CardBody, CardTitle } from 'reactstrap'
var moment = require("moment");
const randomizedPersons = ['dotrachit', 'jb.padamchopra', 'lessig', 'ssaurel', 'gm_douzane', 'louispetrik', 'timsneath', 'lessig', 'ssaurel', 'dotrachit', 'ssaurel']

const Blog = () => {
    const [mediumData, setMediumData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let [link, setLink] = useState('');
    const [cardData, setCardData] = useState({});
    const [_summarizedData, _setSummarizedData] = useState({});
    const [emptyRandomFetcher, setEmptyRandomFetcher] = useState(0);
    const [handlerPath, setHandlerPath] = useState(0)
    const axios = require('axios');
    let personUsername = '';
    let forwardSlashIndex = 0;
    let inputURL = '';
    let summaryLength = 2;

    function shortCall() {
        summaryLength = 0;
        let data = JSON.stringify({ data: cardData.content });
        axios.post(`https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/0`, data, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                _setSummarizedData({
                    content: response.data,
                    status: response.status
                })
            })
            .catch(error => {
                console.log(error);
            });;
        return true
    }

    function mediumCall() {
        let data = JSON.stringify({ data: cardData.content });
        axios.post(`https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/${summaryLength}`, data, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                _setSummarizedData({
                    content: response.data,
                    status: response.status
                })
            })
            .catch(error => {
                console.log(error);
            });;
        return true
    }

    function longCall() {
        let data = JSON.stringify({ data: cardData.content });
        axios.post(`https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/${summaryLength}`, data, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                _setSummarizedData({
                    content: response.data,
                    status: response.status
                })
            })
            .catch(error => {
                console.log(error);
            });;
        return true
    }

    function onCardClick(event) {
        const mediumLink = event.currentTarget.id
        link = mediumLink
        setEmptyRandomFetcher(1)
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
                        setCardData({
                            url: inputURL,
                            status: finalData.status,
                            title: finalData[i].title,
                            content: (finalData[i].content).replace(/"/g, "").replace(/“/g, "").replace(/”/g, "")
                        });
                        let data = JSON.stringify({ data: cardData.content });
                        axios.post(`https://cors-anywhere.herokuapp.com/http://mlh-summarizer.herokuapp.com/${summaryLength}`, data, { headers: { "Content-Type": "application/json" } })
                            .then(response => {
                                _setSummarizedData({
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

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 10);
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${randomizedPersons[randomIndex]}`)
            .then(res => res.json())
            .then(response => {
                setMediumData(response.items);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const finalData = mediumData.slice(0, 10);
    const handleImageError = "https://github.com/Medium.png";

    return (
        <div id="blog">
            {isLoading && <p>Fetching data from Medium!</p>}
            <Row>
                {emptyRandomFetcher === 1 ? null : finalData.map(article => (
                    <Col md="4" className="mb-3" key={article.guid}>
                        <div>
                            <Button variant="link" onClick={onCardClick} id={article.link}>
                                <Card >
                                    <CardImg top width="275px" height="275px" src={(article.thumbnail).endsWith('.png') || (article.thumbnail).endsWith('.jpg') || (article.thumbnail).endsWith('.jpeg') ? article.thumbnail : handleImageError} alt="img" />
                                    <CardBody>
                                        <CardTitle>
                                            <p>{article.title}</p>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
            {emptyRandomFetcher === 1 ?
                <div>
                    <p>Medium article title: <b>{cardData.title}</b></p>
                    <p>Please select the length of the summary below.</p>
                    <Button variant="outline-dark" onClick={shortCall} className="mx-1 mb-4">Short</Button>
                    <Button variant="outline-dark" onClick={mediumCall} className="mx-1 mb-4">Medium</Button>
                    <Button variant="outline-dark" onClick={longCall} className="mx-1 mb-4">Long</Button>
                    <Card className="text-md-left my-2">
                        <Card.Header as="h5">
                            {_summarizedData.status === 200 ? cardData.title : "Post Title"}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {_summarizedData.status === 200 ? _summarizedData.content : "This is where you'll see your summarized content!"}
                            </Card.Text>
                            {_summarizedData.status === 200 ? <div>
                                <Button className="mx-1" variant="outline-dark" href="/">Go back to home</Button>
                            </div> : null}
                        </Card.Body>
                    </Card>
                </div> : null}
        </div>
    );
};

export default Blog;