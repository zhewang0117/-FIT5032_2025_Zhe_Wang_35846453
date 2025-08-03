<template>
  <h1>Create an Account</h1>
  <p>
    <select v-model="role">
      <option value="user">user</option>
      <option value="admin">admin</option>
      <option value="editor">editor</option>
    </select>
  </p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const role = ref("user"); // 默认角色
const router = useRouter();
const auth = getAuth();
const db = getFirestore();

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    
    // 将角色信息存储到 Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role.value,
      createdAt: new Date()
    });
    
    console.log("Firebase Register Successful!");
    router.push("/FireLogin");
  } catch (error) {
    console.log(error.code);
  }
};
</script>