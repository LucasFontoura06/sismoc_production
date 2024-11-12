import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: process.env.API_KEY_FB,
  authDomain: process.env.AUTH_DOMAIN_FB,
  projectId: "sismoc-2023",
  storageBucket: process.env.STORAGE_BUCKET_FB,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FB,
  appId: process.env.APP_ID_FB,
  measurementId: process.env.MEASUREMENT_ID_FB,
};

const serviceAccountKey = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

let app;
let adminApp;

try {
  if (!serviceAccountKey.project_id || !serviceAccountKey.private_key || !serviceAccountKey.client_email) {
    throw new Error("Credenciais do Firebase estão incompletas.");
  }

  app = initializeApp(firebaseConfig);

  if (!admin.apps.length) {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
    });
  } else {
    adminApp = admin.app();
  }

  console.log("Firebase inicializado com sucesso");
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
  throw error;
}

export const adminAuth = adminApp ? admin.auth(adminApp) : null;
export const adminFirestore = adminApp ? admin.firestore(adminApp) : null;
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);