##  Opening the upload folder and accessing the .ma4 file
import os
from pydub import AudioSegment
import ffmpeg
folder_path = 'D:/Cap_Stone/Backend/upload'
files = os.listdir(folder_path)
print(files)

## Now convert the file into the mp3 file
# def convert_m4a_to_mp3 (m4a_filepath,mp3_filepath) :
#     try:
#         # if isinstance(m4a_filepath, list):
#         #     m4a_filepath = m4a_filepath[0]  # Take the first file in the list
#         m4a_filepath = files

#         audio = AudioSegment.from_file(m4a_filepath, format="m4a")
#         audio.export(mp3_filepath, format="mp3")
#         print(f"Successfully converted {m4a_filepath} to {mp3_filepath}")
#     except Exception as e:
#         print(f"Error converting {m4a_filepath}:{e}")

# m4a_file = files
# mp3_file = 'D:/Cap_Stone/Backend/controller/mp3files'
# convert_m4a_to_mp3(files,mp3_file)



# def convert_m4a_to_mp3 (m4afilepath,mp3filepath) :
#     try:
#         (
#         ffmpeg.input(m4afilepath)
#         .output(mp3filepath)
#         .run()
#         )
#     except Exception as e:
#         print (e)


# convert_m4a_to_mp3(files[0],'D:/Cap_Stone/Backend/controller/mp3files')






