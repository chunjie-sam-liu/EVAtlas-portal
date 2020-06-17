from flask import render_template
from evea import app

from evea.routes.search import search

app.register_blueprint(search, url_prefix='/api/search')

# from evea.routes.sample import sample
# from evea.routes.home import home
# from evea.routes.mirna import mirna
# routing #
# app.register_blueprint(sample, url_prefix='/api/sample')
# app.register_blueprint(home, url_prefix='/api/home')
# app.register_blueprint(mirna, url_prefix='/api/mirna')


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")
