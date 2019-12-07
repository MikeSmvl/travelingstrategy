import argparse

class Flags:
		"""
    Class used to parse flags passed in during script executions.
    """

		def __init__(self):
				self.parser = argparse.ArgumentParser()
				self.parser.add_argument('-i','--info', help='Set logger to report at the info level', action='store_true')
				self.parser.add_argument('-s','--success', help='Set logger to report at the success level', action='store_true')
				self.parser.add_argument('-d','--debug', help='Set logger to report at the debug level', action='store_true')
				self.parser.add_argument('-w','--warning', help='Set logger to report at the warning level', action='store_true')
				self.parser.add_argument('-e','--error', help='Set logger to report at the error level', action='store_true')
				self.parser.add_argument('-c','--critical', help='Set logger to report at the critical level', action='store_true')
				self.args = vars(self.parser.parse_args())

		def get_logger_level(self):
				for item in self.args:
						if self.args[item]: return item.upper()


if __name__ == '__main__':
		flags = Flags()
		level = flags.get_logger_level()

		if not level: print('No flag was given!')
		else: print(f'Logger level is {level}')