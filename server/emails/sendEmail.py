from email_class import Email


sender = "390soen@gmail.com"
recipient = "oumarba221296@hotmail.fr"
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

email = Email(subject, sender, recipient, html)
email.sendEmail(password)