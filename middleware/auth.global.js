export default defineNuxtRouteMiddleware(async (to, from) => {
	const currentRoute = to.path;

	const router = useIonRouter();
	const { user } = useAuth();
	const role = user.value?.role;

	if (currentRoute.includes("/second")) {
		if (role !== "admin")
			router.replace({
				path: "/unauthorised",
			});
	}
});
