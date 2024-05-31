export const useFunctions = () => {
	const supabase = useSupabaseClient();

	async function callFunction(name, params) {
		if (!name || !params)
			return { data: null, error: new Error("Missing name or params") };

		const { data, error } = await supabase.functions.invoke(name, {
			body: params,
		});
		if (error) return { data: null, error };
		if (data.error) return { data: null, error: new Error(data.error) };
		return { data };
	}

	return callFunction;
};
