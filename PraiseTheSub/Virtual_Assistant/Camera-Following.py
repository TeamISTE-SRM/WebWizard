import cv2
import numpy as np

import serial
import time
SerialObj = serial.Serial('/dev/ttyUSB0') # COMxx  format on Windows
SerialObj.baudrate = 9600  # set Baud rate to 9600
SerialObj.bytesize = 8   # Number of data bits = 8
SerialObj.parity  ='N'   # No parity
SerialObj.stopbits = 1   # Number of Stop bits = 1
time.sleep(3)


# Initialize the face classifier (you need to load a pre-trained classifier here)
face_classifier = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)
video_capture = cv2.VideoCapture(0)

# Function to calculate direction based on face position


def calculate_direction(vid, frame_width, frame_height, face_x, face_y, face_width, face_height):
    center_face_x = face_x + (face_width / 2)
    center_face_y = face_y + (face_height / 2)

    percent_offset_x = (center_face_x - (frame_width / 2)) / (frame_width / 2)
    percent_offset_y = (center_face_y - (frame_height / 2)
                        ) / (frame_height / 2)
    # cv2.rectangle(vid, (frame_width, frame_height), (frame_width +
    #               face_width, frame_height + face_height), (0, 255, 0), 4)

    if percent_offset_x < -0.3:
        direction_x = "Left"
        SerialObj.write(b'6\n') 
    elif percent_offset_x > 0.3:
        direction_x = "Right"
        SerialObj.write(b'4\n') 
    else:
        direction_x = "Center"

    if percent_offset_y < -0.3:
        direction_y = "Up"
        SerialObj.write(b'2\n') 
    elif percent_offset_y > 0.3:
        direction_y = "Down"
        SerialObj.write(b'1\n') 
    else:
        direction_y = "Center"

    # Determine corner directions
    if direction_x == "Left" and direction_y == "Up":
        SerialObj.write(b'6\n')
        SerialObj.write(b'2\n')  
        return "Left Corner"
        
    elif direction_x == "Right" and direction_y == "Up":
        SerialObj.write(b'4\n')
        SerialObj.write(b'2\n')
        return "Right Corner"
    elif direction_x == "Left" and direction_y == "Down":
        SerialObj.write(b'6\n')
        SerialObj.write(b'1\n')
        return "Left Bottom Corner"
    elif direction_x == "Right" and direction_y == "Down":
        SerialObj.write(b'4\n')
        SerialObj.write(b'1\n')
        return "Right Bottom Corner"
    else:
        return direction_x + " " + direction_y

# Main function to detect face and print direction

face_det =True
def detect_and_print_direction(vid):
    global face_det
    gray_image = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(
        gray_image, 1.1, 5, minSize=(40, 40))

    if len(faces) > 0:
        face_det = True
        (x, y, w, h) = faces[0]  # Assuming only one face is detected
        cv2.rectangle(vid, (x, y), (x + w, y + h), (0, 255, 0), 4)
        direction = calculate_direction(
            vid, vid.shape[1], vid.shape[0], x, y, w, h)
        print(direction)
    else:
        if face_det == True:
            print("No face")
            face_det = False

# Example usage:
# Assuming vid is a frame from the video
# detect_and_print_direction(vid)


while True:

    result, video_frame = video_capture.read()  # read frames from the video
    if result is False:
        break  # terminate the loop if the frame is not read successfully

    # apply the function we created to the video frame
    faces = detect_and_print_direction(video_frame)

    cv2.imshow(
        "My Face Detection Project", video_frame
    )  # display the processed frame in a window named "My Face Detection Project"

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

video_capture.release()
cv2.destroyAllWindows()
