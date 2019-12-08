import logging
from logging import getLogger, StreamHandler
from os.path import dirname, abspath
from sys import path

# Append helper_folder to system path
# to make sure color import works no matter where the logger is imported from
helper_folder_path = dirname(abspath(__file__))
path.append(helper_folder_path)

from color import ColoredFormatter

class Logger(object):
    """
    Class used to log events grouped by levels: (Info, Success, Debug, Warning, Error, Critical)
    """

    def __init__(self, name='logger', level=logging.DEBUG):
        # Initialize logger
        self.logger = logging.getLogger(name)

        # Create success logging level
        self.SUCCESS = 25 # Place success level between WARNING and INFO
        logging.addLevelName(self.SUCCESS, 'SUCCESS')
        setattr(self.logger, 'success', lambda message, *args: self.logger._log(self.SUCCESS, message, args))

        # Set level
        self.logger.setLevel(level)

        # Create handler and use color formatter
        formatter = ColoredFormatter()
        sh = StreamHandler()
        sh.setFormatter(formatter)

        # Add handler to logging
        self.logger.addHandler(sh)

    def success(self, msg, *args, **kwargs):
        if self.logger.isEnabledFor(self.SUCCESS):
            self.logger._log(self.SUCCESS, msg, args, **kwargs)

    def debug(self, msg):
        self.logger.debug(msg)

    def info(self, msg):
        self.logger.info(msg)

    def warning(self, msg):
        self.logger.warning(msg)

    def error(self, msg):
        self.logger.error(msg)

    def critical(self, msg):
        self.logger.critical(msg)

if __name__ == '__main__':
    LOGGER = Logger()
    LOGGER.info('info')
    LOGGER.success('success')
    LOGGER.debug('debug')
    LOGGER.warning('warning')
    LOGGER.error('error')
    LOGGER.critical('critical')
