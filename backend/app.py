# render_template：参照するテンプレートを指定
# jsonify：json出力
from random import *
from flask_cors import CORS
from flask import Flask, render_template, jsonify

# CORS：Ajax通信するためのライブラリ

# static_folder：vueでビルドした静的ファイルのパスを指定
# template_folder：vueでビルドしたindex.htmlのパスを指定
app = Flask(__name__, static_folder="../frontend/dist/static",
            template_folder="../frontend/dist")

app.config.from_object(__name__)

CORS(app)

# 任意のリクエストを受け取った時、index.htmlを参照


@app.route('/', defaults={'path': ''}, methods=["GET"])
@app.route('/<path:path>')
def index(path):
    # 入力されたデータの配列
    date_ar = []
    genre_ar = []
    contents_ar = []
    date_ar.append("10/27")
    genre_ar.append("a")
    contents_ar.append("b")
    return render_template('childcare.html', date_array=date_ar, genre_array=genre_ar, contents_array=contents_ar)

# '/rand'が叩かれた時、乱数を生成


@app.route('/rand')
def random():
    response = {
        'randomNum': randint(1, 100)
    }
    return jsonify(response)


# app.run(host, port)：hostとportを指定してflaskサーバを起動
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

    # app.run(debug=True, host='localhost', port=5000)

