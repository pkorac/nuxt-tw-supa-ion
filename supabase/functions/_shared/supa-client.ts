import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supaClientWithAuth = (req) => {
	if (!req) {
		return { data: null, error: new Error("Request object is required") };
	}
	const client = createClient(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_ANON_KEY") ?? "",
		{
			global: {
				headers: { Authorization: req.headers.get("Authorization")! },
			},
		},
	);
	return client;
};

export const supaClient = () => {
	const client = createClient(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_ANON_KEY") ?? "",
	);
	return client;
};

export const getUser = async (req) => {
	if (!req) {
		return { data: null, error: new Error("Request object is required") };
	}
	const client = supaClientWithAuth(req);
	const token = req.headers.get("Authorization").replace("Bearer ", "");
	const {
		data: { user },
	} = await client.auth.getUser(token);
	return { data: user, error: null };
};
