import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender = "390soen@gmail.com"
recipient = "oumarba221296@hotmail.fr"

# Multipart/alternative to send other than plaintext.
msg = MIMEMultipart('alternative')
msg['Subject'] = "Testing Email"
msg['From'] = sender
msg['To'] = recipient

# Create the body of the message (HTML version).
html = """\
<html>
  <head>
  <h1>Travelling Strategy is amazing</h1>
  </head>
  <body>
    <p>Hi! I am the traveling strategy bot<br>
       How are you?<br>
       Here is your favorite <a href="http://www.travelingstrategy.com">website</a> .
    </p>
  </body>
</html>
"""

#MIME (https://en.wikipedia.org/wiki/MIME)for sending other than plain text

htmlMail = MIMEText(html, 'html')

# Attach parts into message container.
msg.attach(htmlMail)

# Send the message via local SMTP server.
# 587 is the SMTP TLS port
mail = smtplib.SMTP('smtp.gmail.com', 587)

# Identifying to the server
mail.ehlo()

# Puts the connection in TLS
mail.starttls()

mail.login('390soen@gmail.com', '390minicapstone')
mail.sendmail(sender, recipient, msg.as_string())
mail.quit()