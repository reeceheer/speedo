from flask import Flask, jsonify
import random
import threading
import time

app = Flask(__name__)
rand_num = random.randint(1, 100)

def generate_random_number():
    global rand_num
    while True:
        rand_num = random.randint(1, 100)
        time.sleep(1)

t = threading.Thread(target=generate_random_number)
t.start()

@app.route('/random_number')
def random_number():
    return jsonify({'number': rand_num})

if __name__ == 'main':
    app.run()