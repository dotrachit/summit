import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, Col } from "reactstrap";
var moment = require("moment");
const randomizedPersons = ['dotrachit', 'jb.padamchopra', 'lessig', 'ssaurel', 'gm_douzane', 'louispetrik', 'kennethreilly', 'timsneath', 'lessig', 'ssaurel']

const Blog = () => {
    const [mediumData, setMediumData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                            <Card>
                                <CardImg top width="275px" height="275px" src={(article.thumbnail).endsWith('.png') || (article.thumbnail).endsWith('.jpg') || (article.thumbnail).endsWith('.jpeg') ? article.thumbnail : handleImageError} alt="img" />
                                <CardBody>
                                    <CardTitle>
                                        <a href={article.link}>{article.title}</a>
                                    </CardTitle>
                                    <CardSubtitle>
                                        {moment(article.pubDate).format("MMMM Do YYYY")}
                                    </CardSubtitle>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Blog;