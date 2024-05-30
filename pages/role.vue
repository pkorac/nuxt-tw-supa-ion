<template>
  <ds-page title="Change Role" headerTitle="Change Role">
    <template #leading
      ><ion-button router-link="/" router-direction="back"
        >Second page</ion-button
      ></template
    >

    <form @submit.prevent="changeRole">
      <input class="inputs" placeholder="New role" v-model="role" />
      <ion-button type="submit">Change Role</ion-button>
    </form>
    <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  </ds-page>
</template>
<script setup>
const callFunc = useFunctions();
const { user, refreshDetails } = useAuth();
const role = ref("user");

async function changeRole() {
  console.log("calling");
  const { data, error } = await callFunc("change-role", { role: role.value });
  if (error) {
    console.log("error", error);
  } else {
    console.log("Updated role", data);
    await refreshDetails();
  }
}
</script>
