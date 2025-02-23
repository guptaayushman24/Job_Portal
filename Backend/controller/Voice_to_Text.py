import whisper
import os
import ffmpeg
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
## Converting the recorded file to the the mp3file
folder_path = 'D:/Cap_Stone/Backend/upload'
file_list = os.listdir('D:/Cap_Stone/Backend/upload')
# Get the full path of the first file
if file_list:
    file_path = os.path.join(folder_path, file_list[0])
    print("File found:", file_path)
else:
    print("No files found in the folder")

input_file = file_path
output_file = "D:/Cap_Stone/Backend/controller/mp3files/audio.mp3"
ffmpeg.input(input_file).output(output_file).run(overwrite_output=True)


## Get the full path of the mp3 file
folder_path_mp3 = 'D:/Cap_Stone/Backend/controller/mp3files'
file_list_mp3 = os.listdir(folder_path_mp3)
if file_list_mp3:
   file_list_mp3_path = os.path.join(folder_path_mp3,file_list_mp3[0])
else :
   print("No files found in the folder")

print(file_list_mp3_path)
model = whisper.load_model("medium")
result = model.transcribe(file_list_mp3_path,fp16=False)
# print(result["text"])
with open("D:/Cap_Stone/Backend/controller/Response/Response.txt", "w") as file:
   file.write(result["text"])



## Generating the score of the response

## Loading the trained model and tokenizer
model_path = 'G:/My Drive/my_model'
model = AutoModelForSequenceClassification.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

## Reading the answers from the file (Response.txt)
with open ('D:/Cap_Stone/Backend/controller/Response/Response.txt',"r") as file:
   contents = file.read()
print(contents)
## Define Questions and Answers
done = false
questions = [
   "Tell me about yourself ?",
   "Why should we hire you?"
]
question = "Tell me about yourself ?"

# Format Input (Concatenating Question and Answer)
input_text1 = f"Question: {question} Answer :{contents}"

# Tokenize Input
tokens = tokenizer(input_text1, return_tensors="pt", padding=True, truncation=True)

# Pass through model
with torch.no_grad():
   outputs1 = model(**tokens)

# Extract Logits (Raw Scores)
logits1 = outputs1.logits

# Apply softmax to convert into probabilities (for 0-10 scores)
probabilities1 = torch.nn.functional.softmax(logits1, dim=-1)

# Get the Predicted Score (Highest Probability Index)
predicted_score1 = torch.argmax(probabilities1).item()

# Print Results
# print(f"Answers Predectied Score :{predicted_score1}")


##### Score Card ####
# IF score 0-4 => Bad Answer need lot of improvment
# IF score 5-7 => Good Answer
# IF score 8-10 => Excellent Answer

if (predicted_score1 >= 0 and predicted_score1 <= 4):
  print(f"Bad Answer need lot of improvment {predicted_score1}")
elif (predicted_score1 >= 5 and predicted_score1 <=7):
  print(f"Good Answer {predicted_score1}")
elif (predicted_score1>=8 and predicted_score1<=10):
  print(f"Excellent Answer {predicted_score1}")

