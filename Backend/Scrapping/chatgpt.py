import openai
import os
from dotenv import load_dotenv
import json
load_dotenv()
import jsonify

# set the api key 
class email_generation:
    
    def __init__(self) -> None:
        self.api_key = os.environ['OPENAI_API_KEY']
        openai.api_key = self.api_key
        self.prompt = '',
        self.text = ''

    # Build the chat gpt
    def generate_response(self,prompt):
        response = openai.ChatCompletion.create( 
            model = 'gpt-3.5-turbo',
            messages =  [{
                'role' : "user",
                'content' : prompt
            }]
        )
        text_message = response.choices[0].message.content.strip()
        print(text_message)
        
        modified_text_message = text_message.replace("'", '"')
        # modified_text_message = modified_text_message.replace('\n',' ')
        
        email_disc = json.loads(modified_text_message)
        # email_disc['body'] = email_disc['body'].replace('\n',' ')
        
        return email_disc
    
    # # Refine the generate text
    # def  extract_json(self,text):
    #     start_index = text.find('{')
    #     end_index = text.rfind('}') + 1

    #     # Extract the dictionary string
    #     dictionary_str = text[start_index:end_index]

    #     # Parse the dictionary string into a Python dictionary
    #     try:
    #         email_dict = json.loads(dictionary_str)
    #         print(email_dict)
    #         return email_dict
    #     except ValueError as e:
    #         print(f"Error : {e}")
    #         print("Invalid dictionary string.")
    #         return None
    


if __name__ == "__main__":
    prompt = '''
    Job Description :
    
        At least 2 years of industry experience.
        Deep knowledge about Java (Java 8, Lambdas, Collections, popular frameworks & libraries), JVM, GC tuning, performance tuning.
        Worked on REST frameworks/libraries like Spring MVC, Spring Boot, Dropwizard, REST Express, etc.
        Worked on Relational data stores viz. MySQL, Oracle or Postgres.
        Worked on Nonrelational data stores viz. Cassandra, HBase, Couchbase, MongoDB, etc.
        Worked on caching infra viz. Redis, Memcached, Aerospike, Riak, etc.
        Worked on Queueing infra viz. Kafka, RabbitMQ, ActiveMQ, etc.

        Job Function: IT Software: Software Products & Services
        Industry: Consulting Services
        Specialization: Software Engineer
        Qualification: Any Graduate
        Employment Type: Full Time

        Key Skills: REST, Oracle, Spring Boot, Java, Spring MVC, Cassandra, Couchbase, MySQL, MongoDB, HBase

        Job Posted by: Company: The Modern Dimension
        Website: https://www.tmd.net.in/opportunities.html
        Industry: Consultancy Services (Other Consultancy Services)
        Job Id: 69052095
        
    Resume Details:

        OLIVIA WILSON
        Student

        PROFILE

        EDUCATION
        - Business Administration student.
        - Currently pursuing Business Administration at MILEMORA UNIVERSITY.
        - Completed first work experience at BRAYERSHIRE COLLEGE (2017-2021).

        CONTACT ME
        - Phone: (123) 456-7890
        - Email: hello@reallygreatsite.com
        - Address: 123 Anywhere St., Any city, State, Country 12345

        LANGUAGE
        - Native English speaker.
        - Advanced proficiency in Spanish.

        COMPUTER SKILLS
        - Proficient in text processing, spreadsheet, and slide presentation software.

        VOLUNTEER EXPERIENCE
        - VELVERAL FOODS INC.: Participated in collections to distribute food in low-income schools.
        
        "Generate an email template for a job seeker expressing interest in a specific job position. The email should include the sender's name, email address, the position they are applying for, a brief introduction highlighting their relevant skills and experiences, and a closing statement expressing enthusiasm for the opportunity. The email should be professional, concise, and tailored to the specific job listing."
        
        now covert the generated email into python dictionary in format make sure no more key should be formed
        {
        'sender_name' : {its content},
        'sender_email' : its value,
        'subject' : {its value},
        'salutation : {its value}
        'body' : {its value},
        }
    
    '''
    
    Egen = email_generation()
    jsonify_email = Egen.generate_response(prompt)
    
    # write the json formatted email in json file
    try:
        with open('Email.json','w') as file:
            json.dump(jsonify_email,file, indent=2)
            
    except Exception as e:
        print(f"Error : {e}")
        
    