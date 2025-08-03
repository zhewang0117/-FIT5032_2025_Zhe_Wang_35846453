<!-- eslint-disable vue/no-template-arrow -->
<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center fw-bold">🗄 W5 Library Registration Form</h1>
        <p class="text-center">Let's bulid some more advanced features into our form</p> 
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- <div class="col-md-6"> -->
            <div class="col-sm-6">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username"  @input="validateName(false)" @blur="validateName(true)" v-model="formData.username" />
                <div v-if="errors.username" class="text-danger">
                  {{ errors.username }}
                </div>
            </div>
            <!-- <div class="col-md-6"> -->
            
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" @blur="validateGender(true)" v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">
                   {{ errors.gender }}
               </div>
            </div>

          </div>
          <div class="row mb-3">
            
            <div class="col-sm-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password"
                    @blur="validatePassword(true)"
                    @input="validatePassword(false)"
                     v-model="formData.password" />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            
            <div class="col-md-6 col-sm-6">
             <label for="confirm-password" class="form-label">Confirm password</label>
             <input
               type="password"
               class="form-control"
               id="confirm-password"
               v-model="formData.confirmPassword"
               @blur="validateConfirmPassword(true)"
                  />
               <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
              </div>

              <div class="col-md-6">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="isAustralian" v-model="formData.isAustralian">
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea class="form-control" id="reason" rows="3" @blur="validateReason(true)" @input="checkFriend" v-model="formData.reason"></textarea>
            <div v-if="errors.reason" :class="errors.reason === 'Great to have a friend!' ? 'text-success' : 'text-danger'">
              {{ errors.reason }}
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="row mt-5 d-flex justify-content-center" v-if="submittedCards.length">
    <div class="col-10">
      <DataTable 
        :value="submittedCards" 
        striped 
        bordered 
        responsive 
        class="p-datatable-sm w-100"
      >
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password"></Column>
        <Column field="isAustralian" header="Australian Resident">
          <template #body="{ data }">
            {{ data.isAustralian ? 'Yes' : 'No' }}
          </template>
        </Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="reason" header="Reason"></Column>
      </DataTable>
    </div>
  </div>
</template>


<script setup>
// Our logic will go here
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
  
const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    confirmPassword: '',
    gender: '',
    suburb: 'Clayton'
});

const submittedCards = ref([]);


const submitForm = () => {
  
  validateName(true);
  validatePassword(true);
  validateGender(true);
  validateReason(true);
  validateConfirmPassword(true); // 新增：验证确认密码

 const hasError = errors.value.username || 
                  errors.value.password || 
                  errors.value.gender ||
                  errors.value.confirmPassword ||
                  (errors.value.reason && errors.value.reason !== "Great to have a friend!");

  if (!hasError) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
};

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword:'',
    isAustralian: false,
    reason: '',
    gender: ''
  };

  Object.keys(errors.value).forEach(key => {
    errors.value[key] = null;
  });
};

const errors = ref(
  {
    username: null,
    password: null,
    confirmPassword:null,
    resident: null,
    reason: null,
    gender: null,
  }
);

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters";
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } 
      else if (/\s/.test(password)) {
        if (blur) errors.value.password = "Password cannot contain spaces";
    }
    else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};


const validateGender = (blur) => {
  
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select a gender";
  } else {
    errors.value.gender = null;
  }
};



const checkFriend = () => {
  const reason = formData.value.reason;
  if (reason && reason.toLowerCase().includes('friend')) {
    errors.value.reason = "Great to have a friend!";
  } else if (!errors.value.reason || errors.value.reason === "Great to have a friend!") {
    // 清除 friend 提示（如果没有其他错误）
    errors.value.reason = null;
  }
};

const validateReason = (blur) => {
  const reason = formData.value.reason;
  const minLength = 10;
  const maxLength = 200;
  let newError = null;

  // 1. 检查必填和长度等错误
  if (!reason) {
    newError = "Reason is required";
  } else if (reason.length < minLength) {
    newError = `Reason must be at least ${minLength} characters`;
  } else if (reason.length > maxLength) {
    newError = `Reason must be less than ${maxLength} characters`;
  }

  // 2. 只有在没有其他错误时，才检查 friend 关键词
  if (!newError && reason && reason.toLowerCase().includes('friend')) {
    newError = "Great to have a friend!";
  }

  // 3. 更新错误状态（仅在失焦时）
  if (blur) {
    errors.value.reason = newError;
  }
};


const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}


</script>

<style scoped>
/* Our logic will go here */
.card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>