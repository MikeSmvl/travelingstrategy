from email_events_config import email_header, email_exterior_bg, email_table_one, email_interior_bg, email_table_two, email_table_three, email_table_four, email_table_five, email_footer
import sys, json


# this is a class that has a initializing method for the email events
# and take the list of events as parameter. get_email formats the email in
# the appropriate order

class Email_events_html:
  def __init__(self):
    self.email_header = email_header
    self.email_exterior_bg = email_exterior_bg
    self.email_table_one = email_table_one
    self.email_interior_bg = email_interior_bg
    self.email_table_two = email_table_two
    self.events_content = ""
    self.email_table_three = email_table_three
    self.email_table_four = email_table_four
    self.email_table_five = email_table_five
    self.email_footer = email_footer

  def get_email(self):
    return self.email_header+self.email_exterior_bg+self.email_table_one+self.email_interior_bg+self.email_table_two+self.events_content+self.email_table_three+self.email_table_four+self.email_table_five+self.email_footer

  def add_events(self, events):
      additional_image = """
                                  <tr>
                                    <td height="24"></td>
                                  </tr>
                                  <tr>
                                    <td valign="top" width="48%" align="center"><img src={image} alt="events" width="350" height="200" style="display:block; padding:15px 25px; background-color:#DAE1E9; color:#ffffff; border-radius:3px; text-decoration:none;" /></td>
                                  </tr>
                                  <tr>
                                    <td height="24"></td>
                                  </tr>
                                  <tr>
                                    <td align="center"><span style="color:#48545d;font-size:20px;line-height:18px;font-weight:bold">{title}</span></td>
                                  </tr>
                                  <tr>
                                    <td height="24"></td>
                                  </tr>
                                  <tr>
                                    <td align="center"><p style="color:#667885; font-size:12px; line-height:17px; font-style:italic;">{description}</p></td>
                                  </tr>

      """.format_map({'image': events['image'], 'title':events['title'], 'description': events['description'] })
      self.events_content = self.events_content + additional_image
