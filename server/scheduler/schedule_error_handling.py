import logging
from traceback import format_exc
import traceback
import datetime
import error_email
import yagmail
from schedule import Scheduler


logger = logging.getLogger('schedule')

yag = yagmail.SMTP('travelingstrategy@gmail.com')

recipients = {
  'chanc09@gmail.com': 'charles',
  'svenacious@gmail.com': 'steffan',
  'oumarba221296@hotmail.fr': 'oumar',
  'mikael.samvelian@gmail.com': 'mikael',
  'karimian.hassan@gmail.com': 'hassan',
  'tdelaportas@hotmail.com': 'tyler',
  'ghanemline@gmail.com': 'line',
  'armine.iradian@gmail.com': 'armine'
}

date_of_failure = str(datetime.datetime.now())

class SafeScheduler(Scheduler):

    # To catch jobs that might or might not crash. This will skip the bads job 
    # and execute the subsequent jobs. 

    def __init__(self, reschedule_on_failure=True):

        # If reschedule_on_failure is True, jobs will be rescheduled for their
        # next run 

        self.reschedule_on_failure = reschedule_on_failure
        super().__init__()

    def _run_job(self, job):
        try:
            super()._run_job(job)
        except Exception:
            logger.error(format_exc())
            error_message = traceback.format_exc()
            contents = [
                 "Automation has stopped working " + date_of_failure + error_message
            ]
            job.last_run = datetime.datetime.now()
            yag.send(recipients, 'subject', contents)