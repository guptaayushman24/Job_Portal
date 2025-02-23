import whisper
import os
import ffmpeg
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import glob
questions = [
"Tell me about yourself ?",
"Why should we hire you?"
] 
files_to_delete = [
    "/path/to/folder1/file1.txt",
    "/path/to/folder2/file2.csv",
    "/path/to/folder3/image.png"
]
def convertvoicetotext(index,questions,files_to_delete):
    
    if (index>=len(questions)) :
        return
    
    ## Loading the trained model and tokenizer
    model_path = 'G:/My Drive/my_model'
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    check = False

    with open ('D:/Cap_Stone/Backend/controller/Response/Response.txt',"r") as file:
        contents = file.read()
    print(contents)

    question = questions[index]
    # Format Input (Concatenating Question and Answer)
    input_text1 = f"Question: {question} Answer :{contents}"

    # Tokenize Input
    tokens = tokenizer(input_text1, return_tensors="pt", padding=True, truncation=True)

    with torch.no_grad():
        outputs1 = model(**tokens)

    # Extract Logits (Raw Scores)
    logits1 = outputs1.logits

    # Apply softmax to convert into probabilities (for 0-10 scores)
    probabilities1 = torch.nn.functional.softmax(logits1, dim=-1)

    # Get the Predicted Score (Highest Probability Index)
    predicted_score1 = torch.argmax(probabilities1).item()

    ##### Score Card ####
    # IF score 0-4 => Bad Answer need lot of improvment
    # IF score 5-7 => Good Answer
    # IF score 8-10 => Excellent Answer

    if (predicted_score1>=0 and predicted_score1<=4) :
        print(f"Bad Answer need lot of improvment {predicted_score1}")

        check = True
    
    elif (predicted_score1>=5 and predicted_score1<=7) :
        print(f"Good Answer {predicted_score1}")
        check = True
    
    elif (predicted_score1>=8 and predicted_score1<=10) :
        print(f"Excellent Answer {predicted_score1}")
        check = True

    if (check==True) :
        for file_path in :
            try:
                os.remove(file_path)
                print(f"Deleted file: {file_path}")
                index = index+1
                convertvoicetotext(index,questions,files_to_delete)


            except FileNotFoundError:
                print(f"File not found :{file_path}")

            except Exception as e:
                print(f"Error deleting {file_path} :{e}")





convertvoicetotext(0,questions,files_to_delete)













    








