import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseConfig = {
  apiKey: `${process.env.API_KEY_FB}`,
  authDomain: `${process.env.AUTH_DOMAIN_FB}`,
  projectId: "sismoc-2023",
  storageBucket: `${process.env.STORAGE_BUCKET_FB}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID_FB}`,
  appId: `${process.env.APP_ID_FB}`,
  measurementId: `${process.env.MEASUREMENT_ID_FB}`,
};

const ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: process.env.FIREBASE_AUTH_URI,
  tokenUri: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  clientX509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
  universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY ? "Loaded" : "Not Loaded");
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);

if (!ServiceAccount.projectId || !ServiceAccount.privateKey || !ServiceAccount.clientEmail) {
  throw new Error("Credenciais do Firebase estão incompletas.");
}


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);