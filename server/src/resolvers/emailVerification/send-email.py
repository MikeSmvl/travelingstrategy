import yagmail
import sys

print ('Number of arguments:', len(sys.argv), 'arguments.')
print ('Argument List:', str(sys.argv))

yagmail.SMTP('noreply.travelingstrategy@gmail.com').send(sys.argv[1], 'Email Verification', f'<h1>Ayo Homie 👋<h1> <h2>Those are some mad hacks. 💦</h2> <h3>Here is a</h3> <a href="{sys.argv[2]}">link</a>')