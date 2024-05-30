import { createClient } from "https://esm.sh/@supabase/supabase-js";

import {
  corsHeaders,
  createResponse,
  corsResponse,
} from "../_shared/common.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return corsResponse();

  const reqData = await req.json();
  const newRole = reqData.role;

  if (!newRole) return createResponse({ error: "No role specified" });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  );

  const authHeader = req.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const { data } = await supabase.auth.getUser(token);
  const user = data.user;
  const userID = user?.id;

  if (!userID) {
    return createResponse({ error: "User not found" });
  }

  const { data: userData, error } = await supabase.auth.admin.updateUserById(
    userID,
    { user_metadata: { role: newRole } },
  );

  return createResponse({ message: "All good", currentUser: userData });
});
