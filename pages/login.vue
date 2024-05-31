<template>
  <ds-page headerTitle="Login" pageTitle="Login">
    <div v-if="user" class="px-4 my-6">
      <ion-text class="text-lg"
        >Logged in as
        <span class="font-medium">{{ user.full_name }}</span></ion-text
      >
      <ion-text class="block text-medium dark:text-medium_dark"
        >Email: {{ user.email }}</ion-text
      >
      <ion-text class="text-xs">{{ user.id }}</ion-text>
      <ion-button expand="block" @click="logout" class="mt-6"
        >Log-out</ion-button
      >
    </div>
    <form
      @submit.prevent="formSubmit"
      class="flex flex-col gap-4 px-4 my-6"
      v-else
    >
      <ion-text color="danger" v-if="errorMessage">{{ errorMessage }}</ion-text>
      <div class="flex flex-col gap-2">
        <label for="email" class="font-medium">Email</label>
        <input
          id="email"
          type="email"
          required="true"
          placeholder="m@example.com"
          v-model="email"
          class="inputs block"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-medium">Password</label>
        <input
          id="password"
          type="password"
          required="true"
          v-model="password"
          class="inputs"
        />
      </div>
      <div
        class="expandable-content"
        :class="{ expanded: registrationExpanded }"
      >
        <div class="flex flex-col gap-2">
          <label for="password" class="font-medium">Full Name</label>
          <input
            id="full_name"
            type="full_name"
            v-model="fullName"
            class="inputs"
          />
        </div>
      </div>

      <ion-button type="submit">{{
        registrationExpanded ? "Register" : "Login"
      }}</ion-button>
      <ion-button
        fill="clear"
        @click="registrationExpanded = !registrationExpanded"
        class="-mt-2"
        >{{ registrationExpanded ? "Cancel" : "Register" }}</ion-button
      >
    </form>
  </ds-page>
</template>
<style>
.expandable-content {
  overflow: hidden;
  transition: max-height 0.5s ease;
  max-height: 0;
}
.expanded {
  max-height: 200px;
}
</style>

<script setup>
const router = useIonRouter();
const {
  user,
  login: authLogin,
  logout: authLogout,
  register: authRegister,
} = useAuth();
const email = ref("kai@creativecrow.io");
const password = ref("asdfgh");
const fullName = ref("");
const errorMessage = ref(null);
const registrationExpanded = ref(false);

function validateFields(email, pass) {
  if (!email || !pass) return false;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) return false;
  return true;
}

function clearFields() {
  email.value = "";
  password.value = "";
  fullName.value = "";
  errorMessage.value = null;
  registrationExpanded.value = false;
}

function formSubmit() {
  if (registrationExpanded.value) {
    register();
  } else {
    login();
  }
}

async function login() {
  console.log("will log in");
  errorMessage.value = null;
  if (!validateFields(email.value, password.value)) {
    console.log("Failed validation");
    errorMessage.value = "Invalid email or password";
    return;
  }
  console.log("Passed validation");
  const { data, error } = await authLogin(email.value, password.value);
  if (error) {
    errorMessage.value = error.message;
    return;
  }
  console.log("Signed in successfully");
  clearFields();
  router.replace({ path: "/" });
}

async function logout() {
  console.log("will log out");
  await authLogout();
  clearFields();
}

async function register() {
  console.log("Will register");
  if (!validateFields(email.value, password.value)) {
    console.log("Failed validation");
    errorMessage.value = "Invalid email or password";
    return;
  }
  if (!fullName.value || fullName.value.length < 3) {
    console.log("Failed validation");
    errorMessage.value = "Invalid full name";
    return;
  }
  console.log("Passed validation", email.value, password.value, fullName.value);
  const { data, error } = await authRegister(
    email.value,
    password.value,
    fullName.value,
  );
  if (error) {
    errorMessage.value = error.message;
    return;
  }
  console.log("Registered successfully");
  clearFields();
  router.replace({ path: "/" });
}
</script>
