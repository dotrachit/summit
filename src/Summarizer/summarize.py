#!/usr/bin/python3

import pprint
import nltk
from nltk.tokenize import sent_tokenize
from LDASummarizer import LDASummarizer as Summarizer

def split_lines(doc):
    return doc.split("\n")


def split_sentences(doc):
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')
    return sent_tokenize(doc)


def print_summary(src="", tokenize_sentences:bool=True, num_topics:int=5, print_topics:bool=False):
    pp = pprint.PrettyPrinter(indent=4)
    text = src
    corpus = []
    if tokenize_sentences:
        corpus = split_sentences(text)
    else:
        corpus = split_lines(text)
    summarizer = Summarizer(corpus, num_topics)
    if print_topics:
        pp.pprint(summarizer.get_topic_breakdown())
    else:
        
        return summarizer.get_summary()
