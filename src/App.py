import random
from threading import Thread
from time import sleep
from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

oil = None

def generate_oil():
    global oil
    while True:
        oil = random.randint(10, 99)
        sleep(1)

@app.route('/oil', methods=['GET'])
def get_oil():
    global oil
    if oil is None:
        return jsonify({'error': 'Oil data not generated yet'}), 500
    return jsonify({'oil': oil})

if __name__ == '__main__':
    oil_thread = Thread(target=generate_oil)
    oil_thread.daemon = True
    oil_thread.start()
    app.run(host='localhost', port=5000)
