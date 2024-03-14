import pyttsx3
engine = pyttsx3.init()


import speech_recognition as sr

r = sr.Recognizer()
import requests
import json
import RPi.GPIO as GPIO
switch = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(switch, GPIO.IN)
url = "http://192.168.183.39:5000/generate_response"

while True:
    switch_state = GPIO.input(switch)
    if switch_state != prev_switch_state:
        prev_switch_state = switch_state
        with sr.Microphone() as source:
            print("Say something!")
            audio = r.listen(source)
        try:
            print("you said " + r.recognize_google(audio))
        except sr.UnknownValueError:
            print("could not understand audio")
            engine.say("Sorry Could not process that")
            engine.runAndWait()
        except sr.RequestError as e:
            print("Sphinx error; {0}".format(e))
   

        if e:
            prompt =e
        else:
            prompt = "Hi, how are you?"
        data = {"prompt": prompt}
        json_data = json.dumps(data)
        headers = {"Content-Type": "application/json"}
        response = requests.post(url, data=json_data, headers=headers)

        if response.status_code == 200:
            print("Generated response:", response.json()['response'])
            engine.say(response.json()['response'])
            engine.runAndWait()
        else:
            engine.say("Sorry Could not process that")
            engine.runAndWait()
            print("Error:", response.text)
