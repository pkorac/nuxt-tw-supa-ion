<template>
	<ds-page title="Hello World" headerTitle="Hello World">
		<template #trailing
			><ion-button router-link="login" router-direction="root"
				>Login</ion-button
			></template
		>

		<div class="p-4 flex flex-col gap-4">
			<ion-text class="text-xl">Hello {{ user?.full_name }}</ion-text>
			<ion-button
				router-link="/second"
				router-direction="forward"
				expand="block"
				>Second page (admins only)</ion-button
			>
			<ion-button router-link="/role" expand="block" fill="outline"
				>Change role</ion-button
			>
		</div>
	</ds-page>
</template>
<script setup>
const { user } = useAuth();
</script>
