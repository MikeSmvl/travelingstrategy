from email_construction import Email_events_html
import yagmail
import sys, json
import keyring.backend
from keyrings.alt.file import PlaintextKeyring

#function constructs email dynamically with the number of events in the user's interest list
def getEventsContent(list_of_events):
  email_html = Email_events_html()

  for events in list_of_events:
    email_html.add_events(events)
  return email_html.get_email().replace("\n", "")


keyring.set_keyring(PlaintextKeyring())
recipientEmail = sys.argv[1] #Replace this by your email to until you're done working
list_of_events = json.loads(sys.argv[2])

#piece all the elements of the email together
email_construction = getEventsContent(list_of_events)


yag = yagmail.SMTP('noreply.travelingstrategy@gmail.com')
yag.send(recipientEmail, 'TravelingStrategy', email_construction)


