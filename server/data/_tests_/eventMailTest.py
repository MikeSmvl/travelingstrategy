import sys
from unittest.mock import MagicMock, Mock
import unittest

sys.path.append('../../src/resolvers/emailEvents/')
from email_construction import Email_events_html 

class parseTest(unittest.TestCase):
     def test_add_events(self):
          events = {'request_id': '5', 'event_category': 'conferences', 'description': 'A return of this perennial favorite, featuring renowned arbitrators discussing the hottest topics in commercial dispute resolution.\xa0 A Co-Presentation with the American Arbitration AssociationDate:\xa0April 16, 2020Time: 5:30 p.m. – 6:50 p.m.(wine and cheese reception to follow)Location: Events CenterRegistration Required,\xa0Free Admission 1.5 credit in Professional Practice (NY transitional and nontransitional)NYLS CLE Financial Aid Policy', 'duration': '4800', 'start_date': '2020-04-16T21:30:00Z', 'end_date': '2020-04-16T22:50:00Z', 'title': 'Cutting-Edge Topics in Commercial Arbitration', 'labels': 'conference', 'address': '185 West Broadway New York, NY 10013 United States of America', 'place_type': 'venue', 'name_of_place': 'New York Law School', 'image': 'https://images.unsplash.com/photo-1523302750488-e28820e5ee90?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDcyM30w=600&h=400'}
          email_html = Email_events_html()
          email_html.add_events(events)
          self.assertFalse("", email_html.events_content)

if __name__ == '__main__':
    unittest.main()