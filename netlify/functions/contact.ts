type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json", allow: "POST" },
    });
  }

  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !recipient) {
    return new Response(JSON.stringify({ error: "Contact delivery is not configured" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  const resend = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "Site Le Monde du Goût <onboarding@resend.dev>",
      to: [recipient],
      reply_to: email,
      subject: `Nouveau message de ${name}`,
      text: [`Nom : ${name}`, `Email : ${email}`, `Téléphone : ${payload.phone?.trim() || "Non renseigné"}`, "", message].join("\n"),
    }),
  });

  if (!resend.ok) {
    return new Response(JSON.stringify({ error: "Contact delivery failed" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}