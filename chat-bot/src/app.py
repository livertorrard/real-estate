from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from marshmallow import ValidationError
from json import dumps, loads
from train.response_chatbot import chatBotResponse
import base_schema

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.get('/chat-bots/')
@cross_origin(origins = '*')
def getResponseChatBot():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        schema = base_schema.BaseSchema()

        try:
            result = schema.load(json)
        except ValidationError as err:
            return jsonify(err.messages), 400

        dataInput = loads(dumps(result))
        return chatBotResponse(dataInput['content'])
    else:
        return 'Content-Type not supported!'

if __name__ == '__main__':
    app.run(host = '127.0.0.1', port = '3009' )