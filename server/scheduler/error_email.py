import yagmail
import datetime

yag = yagmail.SMTP('travelingstrategy@gmail.com')

recipients = { 
  # 'chanc09@gmail.com': 'charles', 
  'svenacious@gmail.com': 'steffan'
  # 'oumarba221296@hotmail.fr': 'oumar',
  # 'mikael.samvelian@gmail.com': 'mikael',
  # 'karimian.hassan@gmail.com': 'hassan',
  # 'tdelaportas@hotmail.com': 'tyler',
  # 'ghanemline@gmail.com': 'line',
  # 'armine.iradian@gmail.com': 'armine'
}

date_of_failure = str(datetime.datetime.now())
contents = [
    "Automation has stopped working " + date_of_failure 
]
yag.send(recipients, 'subject', contents)

