# Inscriptions FR Blanzat Basket

Page publique d'inscription aux rôles d'officiels et de bénévoles (arbitres, table de marque, buvette…),
ouverte depuis un lien partagé sur WhatsApp par l'application « FR Blanzat Basket - gestion des matchs ».

- Le lien contient l'adresse de la base, sa clé publique et une clé de partage propre à une ou plusieurs équipes.
- Sans lien valide, la page n'affiche rien. Aucune donnée n'est stockée dans ce dépôt.
- On ne peut s'inscrire que dans une case vide ; les numéros de licence et les codes de match ne sont jamais affichés.

Polices Barlow et Barlow Condensed sous licence SIL Open Font License (`fonts/OFL.txt`).

## Configuration

`config.json` contient l'adresse du projet Supabase (`ref`, la partie avant `.supabase.co`) et sa **clé publique**
(`sb_publishable_…`, faite pour être publique). Une fois rempli, l'application génère des liens courts
(`…/plannings/#t=…`). Ne jamais y mettre la clé secrète (`sb_secret_…`).

`apercu.png` (1200 × 630) est l'image affichée par WhatsApp sous forme d'aperçu : remplaçable par une image du club.
