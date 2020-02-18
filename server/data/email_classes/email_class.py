import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from helper_class.flags import Flags
from helper_class.logger import Logger

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

class Email:

    def __init__(self, subject, origin, destination, html):
        LOGGER.info(f'Creating an email instance:{subject}, {origin}, {destination}')
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = origin
        msg['To'] = destination
        htmlMail = MIMEText(html, 'html')
        msg.attach(htmlMail)

        self.sender = origin
        self.recipient = destination
        self.mail_content = msg

    def sendEmail(self, password):
        LOGGER.info(f'Creating an email sending an email to: {self.recipient} and  from: {self.sender}')
        self.authenticaiton(password)
        self.mail.sendmail(self.sender, self.recipient, self.mail_content.as_string())
        self.mail.quit()

    def authenticaiton(self, password):
        LOGGER.info(f'Authentication to send an email from: {self.sender} and to: {self.recipient}')
        self.mail = smtplib.SMTP('smtp.gmail.com', 587)
        self.mail.ehlo()
        self.mail.starttls()
        self.mail.login(self.sender, password)


