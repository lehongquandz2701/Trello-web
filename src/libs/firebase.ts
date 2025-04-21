import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { envs } from "~/utilities/constant";

const firebaseConfig = {
  apiKey: envs.VITE_API_KEY,
  authDomain: envs.VITE_AUTH_DOMAIN,
  projectId: envs.VITE_PROJECT_ID,
  storageBucket: envs.VITE_STORAGE_BUCKET,
  messagingSenderId: envs.VITE_MESSAGING_SENDER_ID,
  appId: envs.VITE_APP_ID,
  measurementId: envs.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export const getCurrentUser = (): Promise<User> => {
  // wait for firebase initialization then resolve the user
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) return resolve(user);

      return reject(null);
    });
  });
};

export const signInEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const getIdToken = async () => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    return token;
  }
  return null;
};

export const signOut = async () => {
  await getCurrentUser();
  await auth.signOut();
  // GoogleSignin.revokeAccess();
};
