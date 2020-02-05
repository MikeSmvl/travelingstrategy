
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class Email:

    def __init__(self, subject, origin, destination, html):
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
        self.authenticaiton(password)
        self.mail.sendmail(self.sender, self.recipient, self.mail_content.as_string())
        self.mail.quit()

    def authenticaiton(self, password):
        self.mail = smtplib.SMTP('smtp.gmail.com', 587)
        self.mail.ehlo()
        self.mail.starttls()
        self.mail.login(self.sender, password)


