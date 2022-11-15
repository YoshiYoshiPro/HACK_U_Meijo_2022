from flask import Flask, render_template
from flask_restful import Api, Resource

app = Flask(__name__, static_folder='../frontend/dist/static', template_folder='../frontend/dist')
api = Api(app)

class Spam(Resource):
    def get(self):
        return {'id': 42, 'name': 'Name'}

api.add_resource(Spam, '/api/spam')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
