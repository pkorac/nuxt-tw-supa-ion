<template>
	<ds-page title="Unauthorised" headerTitle="Unauthorised">
		<template #leading
			><ion-button router-link="/" router-direction="back"
				>Home</ion-button
			></template
		>

		You don't have permission to see this page as a {{ user.role }}.</ds-page
	>
</template>
<script setup>
const { user } = useAuth();
</script>
