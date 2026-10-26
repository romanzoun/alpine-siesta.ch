// Verbindung zu Trizoun Travel (Buchung über Beds24). Werte pro Website in .env:
//   PUBLIC_TRIZOUN_API_URL  z. B. https://api.example.ch
//   PUBLIC_TRIZOUN_KEY      Publishable Key (tt_pk_…), auf die Domain der Website beschränkt
// Ohne diese Werte zeigt das Buchungs-Widget die Mail-Anfrage.
export const trizoun = {
  apiUrl: import.meta.env.PUBLIC_TRIZOUN_API_URL as string | undefined,
  key: import.meta.env.PUBLIC_TRIZOUN_KEY as string | undefined,
};

export const trizounAktiv = Boolean(trizoun.apiUrl && trizoun.key);
