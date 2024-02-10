import requests
from bs4 import BeautifulSoup
import json
import jsonify


class FetchJobs:
    '''
    Provide required fields to get all jobs located around the given location
    '''

    def __init__(self) -> None:
        self.role = ''
        self.location = ''
        self.url = ''

    def fetch_user_agent(self):
        '''
        Fetch user agent from the file
        '''
        with open('user_agent.json', 'r') as file:
            user_agent_data = json.load(file)
        return user_agent_data.get('User-Agent', '')

    def make_request(self, url, headers):
        '''
        Make the POST request
        '''
        session = requests.Session()
        html_session = session.post(url=url, headers=headers)
        return html_session

    
    def extract_job_details(self, li):
        '''
        Extract job details from the list item
        '''
        role = li.find('h2')
        company_name = li.find('h3')
        job_url = role.find('a')

        date_div = li.find('div', class_="list-job-bt clearfix")
        date = date_div.find('span', class_="sim-posted").text.replace('\t', '')

        ul1 = li.find('ul', class_='top-jd-dtl clearfix')
        li1 = ul1.find_all('li')
        salary_element = next((_ for _ in li1 if 'Rs' in _.text),None)
        salary = salary_element.get_text(strip = True).replace('₹','') if salary_element else 'As per Industry Standard'
        
        experience = ul1.find('li', {'class': None}).text.strip()
        location = ul1.find('span', {'title': True}).text.strip()

        ul2 = li.find('ul', class_='list-job-dtl clearfix')
        job_description = ul2.find('li', {'class': None}).text.replace('Job Description:', '')\
            .replace("\n", '').replace('More Details', '')
        key_skills = ul2.find('span', class_='srp-skills').text

        details = {
            'Company Name': company_name.text.replace('(More Jobs)','').strip().capitalize(),
            'Job Role': role.text.strip(),
            'Job URL': job_url['href'],
            'Date': date.strip(),
            'Experience': experience.replace('card_travel', '').strip(),
            'Salary': salary,
            'Location': location.strip(),
            'Key Skills': key_skills.strip(),
            'Job Description': job_description.strip()
        }

        return details

    def fetch_jobs(self):
        '''
        Fetch the Jobs based on the provided fields, role, etc.
        '''

        # Fetch user agent
        user_agent = self.fetch_user_agent()
        headers = {'User-Agent': str(user_agent)}

        URL = f"https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&searchTextSrc=as&searchTextText=Software&txtKeywords={self.role}&txtLocation={self.location}"

        # start the HTML session
        html_session = self.make_request(URL, headers)

        # Check for request POST was successful or not
        if html_session.status_code == 200:
            soup = BeautifulSoup(html_session.text, 'html.parser')

            # Scrap the div
            div = soup.find('div', id='searchResultData')

            # Fetch the jobs result
            lis = div.find_all('li', class_='clearfix job-bx wht-shd-bx')

            # Storage
            job_result = []

            for li in lis:
                details = self.extract_job_details(li)
                job_result.append(details)

            with open('output.json','w') as file:
                json.dump(job_result, file, indent = 2)
                
            print("JSON data has been written successfully!!")

        else:
            print(f"Error: Unable to fetch the webpage (Status Code: {html_session.status_code})")

        # Closed the html session
        html_session.close()
        
        # send to hitesh for showing on website ("listed Job according to given job role and location")
        return job_result   

    def fetch_description(self, url):
        '''
        Fetch the Description for requested the job 
        
        param : url 
        url should be of the Job url
        '''
        
        # fetch the html page
        html = requests.get(url)
        
        # Check if the request was successfull or not
        if html.status_code == 200:
            
            soup = BeautifulSoup(html.text, 'html.parser')
            description = soup.find('div', class_ = 'wht-shd-bx jd-more-dtl').text.strip().replace('\t','').replace('\r','').replace('\n','')
            data = { 'Description' : description }
            
            with open('Description.json', 'w') as file:
                json.dump(data, file, indent = 2)
        else:
            
            print(f"Error: Unable to fetch the webpage (Status Code: {soup.status_code})")
        
        return data
            
if __name__ == "__main__":
    scrapper = FetchJobs()
    # scrapper.role = 'Backend Developer'
    # scrapper.location = 'Banglore'
    # jobs = scrapper.fetch_jobs()
    
    url = "https://www.timesjobs.com/job-detail/backend-developer-the-modern-dimension-delhi-delhi-ncr-bengaluru-bangalore-4-to-7-yrs-jobid-UDAEZaXALV1zpSvf__PLUS__uAgZw==&source=srp"
    descc = scrapper.fetch_description(url)
    print(f'Description: {descc}')
    # print(jobs)
