import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col } from "reactstrap";
var moment = require("moment");
const randomizedPersons = ['dotrachit', 'jb.padamchopra', 'lessig', 'ssaurel', 'gm_douzane', 'louispetrik', 'timsneath', 'lessig', 'ssaurel', 'dotrachit', 'ssaurel']

const Blog = () => {
    const [mediumData, setMediumData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function onCardClick(event) {
        const mediumLink = event.currentTarget.id
        alert(mediumLink)
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
        <div id="blog" className="container mt-3">
            <hr />
            {isLoading && <p>Fetching data from Medium!</p>}
            <Row>
                {finalData.map(article => (
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
        </div>
    );
};

export default Blog;