<template>
  <ds-page title="Hello World" headerTitle="Hello World">
    <template #trailing
      ><ion-button router-link="login" router-direction="root"
        >Login</ion-button
      ></template
    >
    <h1>Hello {{ user?.full_name }}</h1>
    <ion-button router-link="/second">Second page</ion-button>
    <ion-button router-link="/role">Change role</ion-button>
  </ds-page>
</template>
<script setup>
const { user } = useAuth();
</script>
