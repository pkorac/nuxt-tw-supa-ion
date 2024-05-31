export const useAuth = () => {
	const supabase = useSupabaseClient();
	const supaUser = useSupabaseUser();
	const router = useIonRouter();

	// User Object
	const user = computed(() => {
		if (!supaUser.value) {
			return null;
		}
		return {
			id: supaUser.value?.id || null,
			full_name: supaUser.value?.user_metadata.full_name || null,
			email: supaUser.value?.email || null,
			role: supaUser.value?.user_metadata.role || "user",
		};
	});

	///////////////////////////////////
	//
	// Login
	//
	///////////////////////////////////
	async function login(email, password) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			return { data: null, error: error };
		}

		if (data) {
			if (!data.session)
				return {
					data: null,
					error: new Error(
						"Could not login, perhaps you need to verify your account by clicking on the confirmation link in the email.",
					),
				};
			return { data, error: null };
		}
		return { data, error };
	}

	///////////////////////////////////
	//
	// Register
	//
	///////////////////////////////////
	async function register(email, pass, fullName) {
		if (!email || !pass || !fullName)
			return {
				data: null,
				error: new Error(
					"Missing information. Please provide email, password and Full Name",
				),
			};
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: pass,
			options: {
				data: {
					full_name: fullName,
				},
			},
		});

		if (error) return { data: null, error: error };

		if (data) {
			if (!data.session)
				return {
					data: null,
					error: new Error("Could not Register you. Please try again."),
				};

			return { data, error: null };
		}
		return { data, error };
	}

	///////////////////////////////////
	//
	// Logut
	//
	///////////////////////////////////
	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) return { error };
		router.replace({ path: "/login", routerDirection: "root" });
	}

	///////////////////////////////////
	//
	// Refresh Details (grabs new session and user details)
	//
	///////////////////////////////////
	async function refreshUserData() {
		const { data, error } = await supabase.auth.refreshSession();
		const { session, user } = data;
		if (error) return { data: null, error };
		return { data: { session, user }, error: null };
	}

	return { login, logout, register, user, refreshUserData };
};
