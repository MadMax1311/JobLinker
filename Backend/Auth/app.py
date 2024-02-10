from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from Database import db, User
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

server_session = Session(app)

db.init_app(app)
 
with app.app_context():
    db.create_all()
 
 
@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error" : "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    
    return jsonify({
        "id" : user.id,
        "email" : user.email
    })
    
    
@app.route("/signup", methods=['POST'])
def register_user():
    email = request.json['email']
    password = request.json['password']
    confirm_password = request.json['confirmpassword']
    
    # Validate input
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if confirm_password != password:
        return jsonify({"error": "Passwords do not match"}), 400
    
    # Check if the user already exists
    user_exists = User.query.filter_by(email=email).first() is not None
    
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit() 
    
    session['user_id'] = new_user.id
    
    return jsonify({
        "id" : new_user.id,
        "email" : new_user.email
    })
    
    
@app.route('/login', methods = ['POST'])
def login_user():
    email = request.json['email']
    password  = request.json['password']
    
    # Query the user by email
    user = User.query.filter_by(email=email).first() 
    
    if user is None:
        return jsonify({"error" : "Unauthorized"}),401  # 401 : when the user is not register <> telling them to registered first

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error" : "Unauthorized"}),401
    
    session['user_id'] = user.id
    
    return jsonify({
        "id" : user.id,
        "email" : user.email
    })
    

     
if __name__ == '__main__':
    app.run(debug=True,  )
