#!/usr/bin/python3

import summarize
from flask import Flask, request
from flask_restful import Resource, Api
from operator import itemgetter
import re

app = Flask(__name__)
api = Api(app)



@app.route('/<int:length>', methods=['POST'])
def summary(length):
    if length == 0:
        num_topics = 2
    elif length == 1:
        num_topics = 6
    else:
        num_topics = 10
    
    json_data = request.json
    text = itemgetter('data')(json_data)

    #remove the HTML tags
    processor = re.compile(r'<.*?>')
    text = processor.sub('', text)

    final_ans = summarize.print_summary(src=text,num_topics=num_topics)
    return final_ans

if __name__ == '__main__':
   app.run()
