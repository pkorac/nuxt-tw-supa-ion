export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export const corsResponse = () => {
  return new Response("ok", { headers: corsHeaders });
};

export const createResponse = (responseData) => {
  return new Response(JSON.stringify(responseData), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};
