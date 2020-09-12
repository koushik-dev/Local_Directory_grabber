# Directory Grabber

Directory grabber is a NodeJs and Vue.js powered full stack application which shows your local machine directories and files in the browser.

The application currently supports opening of video files only. The video formats .avi and .flv are not supported as it is using the HTML video tag which shares the same issue.

The video player in the application comes with some custom keyboard controls.

## About the application

The application consists of a simple backend and frontend apps.

The backend is written in NodeJS and express which is used to get the local directories and send it to the frontend.

The frontend is written in Vue.js which makes REST calls to get the data from backend.

## Video Player Keyboard Controls

    1 - rewind 10 sec
    3 - forward 10 sec
    4 - rewind 30 sec
    6 - forward 30 sec
    7 - rewind a minute
    9 - forward a minute
    z - closes the preview player
    f - fullscreen
    m - mute
    . - increase the video playback rate
    , - decrease the video playback rate
    up arrow - increase the volume
    down arrow - decrease the volume
    space - pauses the video


## Key Features

- Single click on the video file to start playing the video in the same page.
- Double click on the video file to open it in new page.
- Single click folder to open the folder.
- Able to navigate forward and backward in the folder location.
- Able the save the frequently used folder location.

## Run

Clone the project to your local.

    npm install

and followed by
    npm start

The above will run both frontend and backend simultaneously.

Now, the project is running at `http://localhost:8080`

## Motivation

The appliaction acts as a incognito mode for local directory as it doesn't carry any trackers and saves to local storage only if you choose save current path.

## Licence
MIT Licence