from helper_class.email_class import Email
from lib.database import Database


sender = "390soen@gmail.com"
subject = "Test Email"
password = "390minicapstone"

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

db = Database("countries.sqlite")
subscribers = db.get_items("subscribers")
for user in subscribers:
      recipient = user[0]
      email = Email(subject, sender, recipient, html)
      email.sendEmail(password)