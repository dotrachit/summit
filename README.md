![summit](https://socialify.git.ci/dotrachit/summit/image?description=1&descriptionEditable=Read%20less%20%F0%9F%93%9A%20Learn%20more%20%F0%9F%A4%93&font=Raleway&language=1&logo=https%3A%2F%2Fcamo.githubusercontent.com%2F3a4e50d59c856d1b01c87c0854e6e229b103903d4f7b07a8659f3b60ae87d7f9%2F68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3737333430393334323538353936323439372f3737353236373633373936393238393232362f6d6f756e7461696e732e706e67&pattern=Charlie%20Brown&theme=Light)

Ever felt that you're running short on time? Don't waste your time reading lengthy unimportant parts of a blog. **Summit summarizes lengthy blog posts for you.**

We use an NLP based approach to predict the importance of each word of a sentence and accordingly manipulate the results.

## Usage
* Head over to https://summit-mlh.tech/.
* Enter a medium URL of the format `https://medium.com/@<username>/<story-id>`.
* Click on submit and enjoy your summarized blog post!
* You can also scroll down to explore randomly fetched summarized Medium blog posts.

## Development

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Installation

In order to install and run this project follow the below steps

* Clone this project
```bash
git clone https://github.com/dotrachit/summit.git
```

### Front-end

#### Prerequisites
* Node and Node Package manager
- You can grab the recent releases of `node` and `npm` from [here](https://nodejs.org/)

#### Setup

* Switch into the project directory using the terminal shell
```bash
cd summit
```
* To install the dependencies, run the follwing command in the project directory
```bash
npm install
```
#### Run project

* Start server at port 3000

```bash
  npm start
```
### Back-end

#### Prerequisites

* Python(2.7 and above)

#### Setup

* Switch to the appropriate directory
```bash
cd summit/src/Summarizer
```
* To install the dependencies, run the follwing command in the project directory
```bash
pip install -r requirements.txt
```
#### Run project

* Start server at port 5000

```bash
  python app.py
```
## Contributions
- All kinds of contributions are welcome!
- But make sure to read and understand our [Contribution Guidelines](CONTRIBUTING.md)

## Stack 

- [ReactJS](https://reactjs.org/)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)

## License

This project is licensed under [GPL-3.0 License](./LICENSE) .
