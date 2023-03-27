import time
from threading import Thread
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
current_value = 1

def generate_values():
    global current_value
    while True:
        current_value = 1
        time.sleep(30)
        current_value = 2
        time.sleep(30)

@app.route('/value', methods=['GET'])
def get_value():
    global current_value
    return jsonify({'value': current_value})

def run_app():
    app.run(host='localhost', port=5001)

if __name__ == '__main__':
    value_thread = Thread(target=generate_values)
    value_thread.daemon = False

    app_thread = Thread(target=run_app)
    app_thread.daemon = False

    value_thread.start()
    app_thread.start()

    value_thread.join()
    app_thread.join()