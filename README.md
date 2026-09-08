# Projet-restau
Refonte Site Restaurant Premium

## Note Google dynamique

La note et le nombre d'avis sont récupérés via la fonction Netlify `/.netlify/functions/google-rating`.

Dans Netlify, ajouter la variable d'environnement `GOOGLE_PLACES_API_KEY` avec une clé Google Cloud autorisant
Places API (New). La clé reste côté serveur et la note affichée utilise `4,6/5 · 660 avis` comme valeur de secours
si Google est indisponible ou si la variable n'est pas encore configurée.

Le formulaire de contact utilise la fonction `/.netlify/functions/contact`. Ajouter également les variables
`RESEND_API_KEY` et `CONTACT_TO_EMAIL` dans Netlify pour recevoir réellement les messages par email.
