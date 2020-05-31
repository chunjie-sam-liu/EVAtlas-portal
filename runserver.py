import os, sys
from evea import app

p = sys.argv[1]
def runserver():
  port = int(os.environ.get('PORT', p))
  app.run(host='localhost', port=port)
  app.run()

if __name__ == '__main__':
  runserver()