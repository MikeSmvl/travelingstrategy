from email_construction import Email_events_html
import yagmail
import sys, json

#pass email arguments and events that belong to the respective accounts
recipientEmail = sys.argv[1] 
list_of_events = json.loads(sys.argv[2])

#intialize the email object and pass list of events
#replace new lines with empty brackets, without it the email is generated with new lines
email_construction = Email_events_html(list_of_events)
emailHtml = email_construction.get_email().replace("\n", "")


yag = yagmail.SMTP('noreply.travelingstrategy@gmail.com', 'Soen490!@#')
yag.send(recipientEmail, 'TravelingStrategy', emailHtml)
