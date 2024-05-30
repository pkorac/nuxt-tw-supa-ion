<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <slot name="leading" />
        </ion-buttons>
        <ion-buttons slot="end">
          <slot name="trailing" />
        </ion-buttons>
        <ion-title>{{ headerTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" v-if="title">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <slot />
    </ion-content>
  </ion-page>
</template>
<script setup>
const props = defineProps({
  headerTitle: {
    type: String,
    default: "Page",
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});
</script>
