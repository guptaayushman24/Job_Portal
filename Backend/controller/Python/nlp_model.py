import sys
import json
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

try:
    # Load the pre-trained model
    model = SentenceTransformer('paraphrase-mpnet-base-v2')

    # Read and parse the user skills and job descriptions
    user_skills = (sys.stdin.readline())  
    job_descriptions = (sys.stdin.readline()) 

    print("The user skills is",user_skills)


    print(f"The user skills are: {user_skills}")
    print(f"The job descriptions are: {job_descriptions}")

    

    # Create embeddings for the user skills and the job description
    user_embedding = model.encode(user_skills)
    job_embedding = model.encode(job_descriptions)

    # Calculate similarity for each job description

    similarity = cosine_similarity([user_embedding],[job_embedding])[0][0]
    print("The similarity is",similarity)
    

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
