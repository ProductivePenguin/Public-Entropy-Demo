
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from datetime import datetime
import multidict  # I suppose this is a thing... but front-end has changed to not use this
# from flask.ext.cors import CORS, cross_origin

# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:port"}})

app.config['UPLOAD_FOLDER'] = 'downloads/'

@app.route("/")
def home():
   return "<h1>Hello! Server is running.</h1>"

@app.route('/upload', methods=['POST'])
def upload():
    # use multidict for multiple files (with same key of "file") in one POST request
    # but currently assuming only one file per POST
    
    # print(request.__dict__)

    # Check if the request has the file part
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']

    # If no file is selected, file will be empty
    if file.filename == '':
        return jsonify({'message': 'No included file'}), 400

    # If a file is selected, you can save it to a server directory or just print its details
    # file.save(os.path.join('/path/to/the/directory', file.filename))

    print('File Details:')
    print(f'Filename: {file.filename}')
    print(f'Content Type: {file.content_type}')

    # Accessing the extra data
    custom_field_value = request.form.get('CustomField', 'Not specified')
    # print(f'Custom Field Value: {custom_field_value}')

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(filepath)
        file.save(filepath)
        category = classify_video(filepath)

    return jsonify({'message': 'File uploaded successfully', 'filename': file.filename, 'customField': custom_field_value}), 200


def classify_video(filename):
    # 在此处添加视频分类逻辑，这里只是一个示例
    return "This is indeed quite the problem to be solved."



if __name__ == '__main__':
    app.run(debug=True)
