from email_events_config import email_header, email_exterior_bg, email_table_one, email_interior_bg, email_table_two, email_table_three, email_table_four, email_table_five, email_footer
import sys, json


# this is a class that has a initializing method for the email events
# and take the list of events as parameter. get_email formats the email in
# the appropriate order

class Email_events_html:
  def __init__(self, list_of_events):
    self.email_header = email_header
    self.email_exterior_bg = email_exterior_bg
    self.email_table_one = email_table_one
    self.email_interior_bg = email_interior_bg
    self.email_table_two = email_table_two.format_map({'image': list_of_events[0]['image'], 'title':list_of_events[0]['title'], 'description': list_of_events[0]['description'] })
    self.email_table_three = email_table_three
    self.email_table_four = email_table_four
    self.email_table_five = email_table_five
    self.email_footer = email_footer

  def get_email(self):
    return self.email_header+self.email_exterior_bg+self.email_table_one+self.email_interior_bg+self.email_table_two+self.email_table_three+self.email_table_four+self.email_table_five+self.email_footer