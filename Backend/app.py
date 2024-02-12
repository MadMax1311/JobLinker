from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from Backend.config import ApplicationConfig
from Backend.models import db, User
from Backend.Scrapping.Fetch_Job import FetchJobs 
from flask_session import Session
from flask_cors import CORS
import pathlib
from Backend.Scrapping.OCR_pdf import ScannedPDF
from Backend.Scrapping.chatgpt import email_generation

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
    

@app.route("/get_jobs", methods = ["POST"])
def submit_job_search():
    
    # get the current user id
    # curr_user = get_current_user()
    # user_id = curr_user['id']
    
    # Extract job role and location from the form data
    data = request.get_json()
    job_role = data['job_role']
    job_location = data['job_location']
    
    # stored the user's resume for OCR 
    file = request.files['file']
    path = pathlib.Path().absolute()
    resume = f'{path}/Resume/resume1.pdf'
    file.save(resume)
    
    # Initialize the job scraper and fetch jobs
    scrapper = FetchJobs()
    scrapper.role = job_role
    scrapper.location = job_location
    jobs = scrapper.fetch_jobs()
    
    return { "details" : jobs } 
    
     
@app.route('/generate_email', methods = ['POST'])
def generate_email():
    
    # get the user's input
    data = request.get_json()
    job_url = data['email']
    
    # fetch the current user userid
    # curr_user = get_current_user()
    # userID = curr_user['id']
    
    # scrap the description of the industry he want to apply for 
    scrapper = FetchJobs()
    fetch_des = scrapper.fetch_description(job_url)
    industry_description = fetch_des['Description']
    
    # Optical Character Recognition (OCR) is performed here
    path = pathlib.Path().absolute()
    # resume = f'{path}/Resume/Resume_1.pdf'
    scanner = ScannedPDF()
    # user_resume_details = scanner.OCR_pdf(resume)
    
    # cretat the final Prompt
    final_prompt = f'''
        Company Description : {industry_description}
            
        User Resume details :     
        
        Generate an email template for a job seeker expressing interest in a specific job position. The email should include the sender's name, email address, the position they are applying for, a brief introduction highlighting their relevant skills and experiences, and a closing statement expressing enthusiasm for the opportunity. The email should be professional, concise, and tailored to the specific job listing.
        
        now covert the generated email into python dictionary in format make sure no more key should be formed,a and must follow the format as given bellow, no key should be replace with any of the other word
            python dict = 
                'sender_name' : 'its content',
                'sender_email' : 'its value',
                'subject' : 'its value',
                'salutation' : 'its value',
                'body' : 'its value',
                
    '''
    
    # generate the final email
    E_gen = email_generation()
    email = E_gen.generate_response(final_prompt)
    # print(email)
    
    return {'email' : email}
    
if __name__ == '__main__':
    app.run(debug=True)
