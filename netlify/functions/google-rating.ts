const PLACE_QUERY = "Le Monde du Goût, 45 Rue de la Boulangerie, 93200 Saint-Denis, France";

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
};

export default async function handler() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Google Places API key is not configured" }), {
      status: 503,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
        "x-goog-fieldmask": "places.rating,places.userRatingCount,places.formattedAddress",
      },
      body: JSON.stringify({ textQuery: PLACE_QUERY, languageCode: "fr" }),
    });

    if (!response.ok) throw new Error(`Google Places returned ${response.status}`);

    const data = (await response.json()) as { places?: GooglePlace[] };
    const place = data.places?.[0];
    if (!place?.rating || !place.userRatingCount) throw new Error("Google Place has no rating data");

    return new Response(JSON.stringify({ rating: place.rating, count: place.userRatingCount }), {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Unable to retrieve Google rating" }), {
      status: 502,
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  }
}