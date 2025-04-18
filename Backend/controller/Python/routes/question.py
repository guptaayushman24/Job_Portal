# from flask import Blueprint, request, jsonify
# import os
# import ffmpeg
# import whisper
# import torch
# from transformers import AutoModelForSequenceClassification, AutoTokenizer
# from flask_cors import cross_origin
# # Create Blueprint
# files_to_delete = [
#     "D:/Cap_Stone/Backend/controller/mp3files/audio.mp3",
#     "D:/Cap_Stone/Backend/controller/Response/Response.txt",
#     "D:/Cap_Stone/Backend/upload/30ada079b5c32c2062d72db115aab666"
# ]
# question_api = Blueprint("question_api", __name__, url_prefix="/questions")
# @question_api.route("/question", methods=["POST"])
# @cross_origin(origin="http://localhost:5173")
# def post_profile():
#     data = request.get_json()  # Getting the JSON data from the request
#     print(data)
#     if not data:
#         return jsonify({"error": "No data provided"}), 400

#     # Extract data field
#     question = data.get("question")

#     # Convert recorded file to MP3
#     folder_path = 'D:/Cap_Stone/Backend/controller/mp3files'
#     # recorded_file_path = "D:/Cap_Stone/Backend/controller/mp3files/1742362757939.mp3"
#     # file_list = os.listdir(folder_path)

#     # Get the list of MP3 files sorted by modification time (newest first)
#     mp3_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.mp3')]
#     mp3_files.sort(key=os.path.getmtime, reverse=True)  # Sort by modified time (latest first)
#     # Get the full path of the first file
#     if mp3_files:
#         file_path = os.path.join(folder_path, file_list[0])
#         print("File found:", file_path)
#     else:
#         return jsonify({"error": "No files found in the folder"}), 400

#     # input_file = file_path
#     if mp3_files :
#         latest_mp3_file = mp3_files[0]
#         input_file = latest_mp3_file
#     else :
#         return jsonify({"error":"No MP3 file found"})
#     output_file = "D:/Cap_Stone/Backend/controller/Response/audio.mp3"

#     # Convert to MP3 using FFmpeg
#     try:
#         ffmpeg.input(input_file).output(output_file).run(overwrite_output=True)
#     except ffmpeg.Error as e:
#         print("FFmpeg Error:", e.stderr.decode())  # Print detailed error
#         return jsonify({"error": "FFmpeg conversion failed"}), 500

    

#     # Get the full path of the MP3 file
#     folder_path_mp3 = 'D:/Cap_Stone/Backend/controller/mp3files'
#     file_list_mp3 = os.listdir(folder_path_mp3)

#     if file_list_mp3:
#         file_list_mp3_path = os.path.join(folder_path_mp3, file_list_mp3[0])
#     else:
#         return jsonify({"error": "No MP3 files found"}), 400

#     print(file_list_mp3_path)

#     # Transcribe audio using Whisper
#     model = whisper.load_model("medium")
#     result = model.transcribe(file_list_mp3_path, fp16=False)

#     # Save transcription to file
#     response_file_path = "D:/Cap_Stone/Backend/controller/Response/Response.txt"
#     with open(response_file_path, "w") as file:
#         file.write(result["text"])

#     # Load trained model and tokenizer
#     model_path = 'G:/My Drive/my_model'
#     model = AutoModelForSequenceClassification.from_pretrained(model_path)
#     tokenizer = AutoTokenizer.from_pretrained(model_path)

#     # Read the transcribed response from the file
#     with open(response_file_path, "r") as file:
#         contents = file.read()

#     print(contents)

#     # Format input for the model
#     input_text1 = f"Question: {question} Answer: {contents}"

#     # Tokenize input
#     tokens = tokenizer(input_text1, return_tensors="pt", padding=True, truncation=True)

#     # Pass through the model
#     with torch.no_grad():
#         outputs1 = model(**tokens)

#     # Extract logits (raw scores)
#     logits1 = outputs1.logits

#     # Apply softmax to get probabilities
#     probabilities1 = torch.nn.functional.softmax(logits1, dim=-1)

#     # Get the predicted score
#     predicted_score1 = torch.argmax(probabilities1).item()

#     # Determine answer quality
#     if 0 <= predicted_score1 <= 4:
#         feedback = f"Bad Answer, needs a lot of improvement ({predicted_score1})"
#     elif 5 <= predicted_score1 <= 7:
#         feedback = f"Good Answer ({predicted_score1})"
#     elif 8 <= predicted_score1 <= 10:
#         feedback = f"Excellent Answer ({predicted_score1})"
#     else:
#         feedback = f"Unknown Score ({predicted_score1})"

    
#     for file_path in files_to_delete:
#         try:
#             os.remove(file_path)
#             print(f"Deleted file :{file_path}")

#         except FileNotFoundError:
#             print(f"File not found: {file_path}")

#         except Exception as e:
#             print(f"Error deleting {file_path}: {e}")

#     print(feedback)

#     if not question:
#         return jsonify({"error": "Missing required fields"}), 400

#     return jsonify({
#         "question": question,
#         "transcribed_answer": contents,
#         "score": predicted_score1,
#         "feedback": feedback
#     })



from flask import Blueprint, request, jsonify
import os
import ffmpeg
import whisper
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from flask_cors import cross_origin

# Files to delete after processing
files_to_delete = [
    "D:/Cap_Stone/Backend/controller/mp3files/audio.mp3",
    "D:/Cap_Stone/Backend/controller/Response/Response.txt",
    "D:/Cap_Stone/Backend/upload/30ada079b5c32c2062d72db115aab666"
]

# Create Blueprint
question_api = Blueprint("question_api", __name__, url_prefix="/questions")

@question_api.route("/question", methods=["POST"])
@cross_origin(origin="http://localhost:5173")
def post_profile():
    data = request.get_json()  # Getting the JSON data from the request
    print(data)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Extract data field
    question = data.get("question")

    # Get the latest MP3 file dynamically
    folder_path = 'D:/Cap_Stone/Backend/controller/mp3files'
    mp3_files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.mp3')]
    mp3_files.sort(key=os.path.getmtime, reverse=True)  # Sort by modified time (latest first)

    if mp3_files:  #  Corrected variable name
        input_file = mp3_files[0]  #  Pick the latest file
        print("Latest MP3 file found:", input_file)
    else:
        return jsonify({"error": "No MP3 files found in the folder"}), 400

    output_file = "D:/Cap_Stone/Backend/controller/Response/audio.mp3"

    # Convert to MP3 using FFmpeg
    try:
        ffmpeg.input(input_file).output(output_file).run(overwrite_output=True)
    except ffmpeg.Error as e:
        print("FFmpeg Error:", e.stderr.decode())  # Print detailed error
        return jsonify({"error": "FFmpeg conversion failed"}), 500

    # Transcribe audio using Whisper
    model = whisper.load_model("medium")
    result = model.transcribe(output_file, fp16=False)  #  Using the converted file

    # Save transcription to file
    response_file_path = "D:/Cap_Stone/Backend/controller/Response/Response.txt"
    with open(response_file_path, "w") as file:
        file.write(result["text"])

    # Load trained model and tokenizer
    model_path = 'G:/My Drive/my_model'
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)

    # Read the transcribed response from the file
    with open(response_file_path, "r") as file:
        contents = file.read()

    print(contents)

    # Format input for the model
    input_text1 = f"Question: {question} Answer: {contents}"

    # Tokenize input
    tokens = tokenizer(input_text1, return_tensors="pt", padding=True, truncation=True)

    # Pass through the model
    with torch.no_grad():
        outputs1 = model(**tokens)

    # Extract logits (raw scores)
    logits1 = outputs1.logits

    # Apply softmax to get probabilities
    probabilities1 = torch.nn.functional.softmax(logits1, dim=-1)

    # Get the predicted score
    predicted_score1 = torch.argmax(probabilities1).item()

    # Determine answer quality
    if 0 <= predicted_score1 <= 4:
        feedback = f"Bad Answer, needs a lot of improvement ({predicted_score1})"
    elif 5 <= predicted_score1 <= 7:
        feedback = f"Good Answer ({predicted_score1})"
    elif 8 <= predicted_score1 <= 10:
        feedback = f"Excellent Answer ({predicted_score1})"
    else:
        feedback = f"Unknown Score ({predicted_score1})"

    # Delete unnecessary files
    for file_path in files_to_delete:
        try:
            os.remove(file_path)
            print(f"Deleted file: {file_path}")
        except FileNotFoundError:
            print(f"File not found: {file_path}")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

    print(feedback)

    if not question:
        return jsonify({"error": "Missing required fields"}), 400

    return jsonify({
        "question": question,
        "transcribed_answer": contents,
        "score": predicted_score1,
        "feedback": feedback
    })
