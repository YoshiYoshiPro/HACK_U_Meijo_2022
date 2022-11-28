# render_template：参照するテンプレートを指定
# jsonify：json出力
from flask import Flask, render_template, jsonify

# CORS：Ajax通信するためのライブラリ
from flask_cors import CORS
from random import *

# static_folder：vueでビルドした静的ファイルのパスを指定
# template_folder：vueでビルドしたindex.htmlのパスを指定
app = Flask(__name__, static_folder="../frontend/dist/static", template_folder="../frontend/dist")

app.config.from_object(__name__)

CORS(app)

# 任意のリクエストを受け取った時、index.htmlを参照
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

# '/rand'が叩かれた時、乱数を生成
@app.route('/rand')
def random():
    response = {
        'randomNum': randint(1,100)
    }
    return jsonify(response)

# app.run(host, port)：hostとportを指定してflaskサーバを起動
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
