from flask import Flask, request, jsonify
from database import Database
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
db = Database('tmdb', 'merged_data')


@app.route('/', methods=['GET'])
def start():
    return jsonify({"msg": "Server on"}), 200


@app.route('/data/<path>', methods=['GET'])
def get_data(path):
    result = db.custom_query(f'Query{path}')
    if result:
        if path == '4':
            result_list = [['Genre', 'Avg Rating', 'Avg Revenue']]
            for item in result:
                result_list.append([item['_id'], item['average_rating'], item['average_revenue']])
            return jsonify({'result': result_list})
        return jsonify({'result': result})
    else:
        return jsonify({'error': 'No matching data found.'}), 404


if __name__ == '__main__':
    app.run(debug=True)
