import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {initializeApp} from "firebase/app";
import {getAnalytics, logEvent} from "firebase/analytics"

const EVENT_APP_OPEN = "app_open"
const firebaseConfig = {
    apiKey: "AIzaSyB1CvCUntkYTwHPN9dgfGOZ0cQ-X-VbCHQ",
    authDomain: "cetele-cbef6.firebaseapp.com",
    projectId: "cetele-cbef6",
    storageBucket: "cetele-cbef6.appspot.com",
    messagingSenderId: "198936208326",
    appId: "1:198936208326:web:d2ac9355b80cd86939c8c7",
    measurementId: "G-G35Y6SD5J6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, EVENT_APP_OPEN)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

