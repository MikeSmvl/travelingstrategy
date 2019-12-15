from logging import Formatter

class Color(object):
		"""
    Class used to define text colors.
    """

		colors = {
				'black': 30,
				'red': 31,
				'green': 32,
				'yellow': 33,
				'blue': 34,
				'magenta': 35,
				'cyan': 36,
				'white': 37,
				'bgred': 41,
				'bggrey': 100
		}

		prefix = '\033['

		suffix = '\033[0m'

		def colored(self, text, color=None):
				if color not in self.colors:
						color = 'white'

				clr = self.colors[color]
				return (self.prefix+'%dm%s'+self.suffix) % (clr, text)


class ColoredFormatter(Formatter):
		"""
    Class used to format logging messages with colors.
    """

		def __init__(self):
			self.colored = Color().colored

		def format(self, record):
				message = record.getMessage()

				mapping = {
						'INFO': 'cyan',
						'WARNING': 'yellow',
						'ERROR': 'red',
						'CRITICAL': 'bgred',
						'DEBUG': 'bggrey',
						'SUCCESS': 'green'
				}

				clr = mapping.get(record.levelname, 'white')

				return self.colored(record.levelname, clr) + ': ' + message
