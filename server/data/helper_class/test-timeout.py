from timeout import timeout
from time import sleep

@timeout(5)
def cool():
	try:
		sleep(5)
		print('cool')
	except Exception as e:
		print(e)

cool()
print('hey')