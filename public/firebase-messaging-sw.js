importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDs5yoifRx-UaIOii9DwM6fW00LVJVM6zg",
  authDomain: "laxz-test.firebaseapp.com",
  databaseURL: "https://laxz-test.firebaseio.com",
  projectId: "laxz-test",
  storageBucket: "laxz-test.appspot.com",
  messagingSenderId: "941083892673",
  appId: "1:941083892673:web:8800bf6508bcacad"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: './firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
