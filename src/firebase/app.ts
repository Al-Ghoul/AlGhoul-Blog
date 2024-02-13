import admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyADr5BgwiK5Or2WdITkGWKx0R4iIhTG4ZI",
  authDomain: "alghoul-blog.firebaseapp.com",
  projectId: "alghoul-blog",
  storageBucket: "alghoul-blog.appspot.com",
  messagingSenderId: "127918153815",
  appId: "1:127918153815:web:ca4072e23bd2eef76f8312",
};

export function initFbAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const privateKey = process.env.FIREBASE_SERVICE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  return admin.initializeApp({
    projectId: firebaseConfig.projectId,
    credential: privateKey === undefined
      ? admin.credential.applicationDefault()
      : admin.credential.cert(
        {
          projectId: firebaseConfig.projectId,
          privateKey,
          clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
        },
      ),
    storageBucket: firebaseConfig.storageBucket,
  });
}
