from flask import render_template
from evea import app
from evea.routes.home import home
from evea.routes.sample import sample
from evea.routes.mirna import mirna

# routing
app.register_blueprint(home, url_prefix='/api/home')
app.register_blueprint(sample, url_prefix='/api/sample')
app.register_blueprint(mirna, url_prefix='/api/mirna')
app.register_blueprint(drug, url_prefix='/api/drug')
app.register_blueprint(category, url_prefix='/api/category')


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")
