# Inbox

Rohe Inhalte hier ablegen und dann zu Claude sagen: **«Inbox verarbeiten»** (Skill `aktivitaeten-import`).

```
inbox/aktivitaeten/
  torrent-ski/            ← ein Ordner pro Element
    notizen.md            ← frei geschrieben: Titel, Beschreibung, Saison, Preise, Links, Tipps
    foto-piste.jpg        ← beliebig viele Bilder, das beste Querformat wird Titelbild
    foto-huette.jpg
  albinenleitern.md       ← oder eine einzelne Datei mit verlinkten Bildern
```

Je mehr Fakten (Saison, Dauer, für wen, Preise, Kinderwagen/Hund), desto weniger muss geschätzt werden. Was fehlt, markiert Claude mit `[PRÜFEN]`.

Inhalte dieses Ordners werden nicht ins Repo committet. Erledigtes landet in `inbox/_erledigt/`.
