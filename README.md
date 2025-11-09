# The Clipboard Drive-Thru

This is an app intended to enable fast and simple text transfers between devices. Think like copy-pasting with just a couple extra clicks.

## How to use: 
* Open the app on both devices
* Enter a pairing code
* Copy your desired text on one device to your clipboard
* Click "paste to server"
* On the other device, click "Copy from server"
The text from the first device has now been copied to the second device.

## We used:
* Express JS server with WebSocket for the backend
* Flutter for the mobile client
* Electron for the desktop client

## Mobile client:
Pairs with websocket
Grabs text from clipboard and sends it to backend
Has events set up so that when it receives a method it updates the requisite variables
Refreshing text uses ValueListenerBuilders so that the text rebuilds whenever the variables are changed
I built it to my phone so that's kinda cool

## Electron client:
Similar layout and logic to the mobile client
An animation and sound effect plays every time you paste text to the server

## Backend
morris you are really going to have to lock in on this one i have no clue how to describe what you have set up

## Members (All Term 1):
Ryan Guan<br/>
Morris Li<br/>
Grace Yang<br/>
Julia Ziebart



