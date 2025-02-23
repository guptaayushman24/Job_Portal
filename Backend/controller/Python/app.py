from flask import Flask
from routes import question_api  # Importing routes
from flask_cors import CORS

app = Flask(__name__)

# Register Blueprint before applying CORS
app.register_blueprint(question_api)

# Apply CORS to the entire app
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}},supports_credentials=True)

if __name__ == "__main__":
    app.run(debug=True, port=8000)
