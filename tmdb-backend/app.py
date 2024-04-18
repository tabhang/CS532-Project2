from flask import Flask, request, jsonify
from database import Database

app = Flask(__name__)
db = Database('tmdb', 'merged')


@app.route('/', methods=['GET'])
def start():
    return jsonify({"msg": "Server on"}), 200


@app.route('/data/<path>', methods=['GET'])
def get_data(path):
    result = db.custom_query(f'Query{path}')
    if result:
        return jsonify({'result': result})
    else:
        return jsonify({'error': 'No matching data found.'}), 404


if __name__ == '__main__':
    app.run(debug=True)
