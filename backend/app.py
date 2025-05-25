from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["mydb"]
collection = db["submissions"]

@app.route('/submit', methods=['POST'])
def submit():
    try:
        name = request.form['name']
        email = request.form['email']
        collection.insert_one({'name': name, 'email': email})
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
