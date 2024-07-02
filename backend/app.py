from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# MongoDB connection
client = MongoClient('mongodb://mongo:27017/')
db = client.user_registration_db
users_collection = db.users

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Insert user data into MongoDB
    users_collection.insert_one({'name': name, 'email': email, 'password': password})
    return jsonify({'message': 'User registered successfully!'})

@app.route('/users', methods=['GET'])
def get_users():
    users = list(users_collection.find({}, {'_id': 0, 'name': 1, 'email': 1}))
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
