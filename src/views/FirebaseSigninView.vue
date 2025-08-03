<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const signin = async () => {
  try {

    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email.value, 
      password.value
    );
    
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error("User data not found!");
    }
    
    const userData = userDoc.data();
    const userRole = userData.role;
    
    console.log("Firebase Login Successful! Role:", userRole);


    switch(userRole) {
      case "admin":
        router.push("/admin-dashboard");
        break;
      case "editor":
        router.push("/content-editor");
        break;
      default: 
        router.push("/user-profile");
    }
    
  } catch (error) {
    console.error("Login failed:", error.code);
    alert(`Login failed: ${error.message}`);
  }
};

</script>

