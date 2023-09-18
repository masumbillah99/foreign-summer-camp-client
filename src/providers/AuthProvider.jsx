import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getUserRole } from "../api/utils";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

// initialize firebase authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserRole(user.email).then((data) => {
        // console.log(data);
        setRole(data?.role);
      });
    }
  }, [user]);

  // sign up new users
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in existing users
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out a user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // get the currently signed-in user
  // observer auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // get and set token
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("school-token", data.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("school-token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // update user data
  const updateUserProfile = (name, img) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img,
    });
  };

  // update user's email address
  const updateUserEmail = (authUser, email) => {
    return updateEmail(authUser, email);
  };

  // update user's password
  const updateUserPassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };

  // google sign in
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    role,
    setRole,
    loading,
    registerUser,
    signInUser,
    logOutUser,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    googleSignIn,
    resetPassword,
  };

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
