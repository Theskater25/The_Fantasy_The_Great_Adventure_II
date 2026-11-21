# The Fantasy Great Adventure II

[Jouer en ligne](https://theskater25.github.io/The_Fantasy_The_Great_Adventure_II/game/) · [Voir le projet sur le portfolio](https://theskater25.github.io/MonUniversInformatique/generic.html#the-great-fantasy-ii)

Campagne navigateur. Le récit reprend après le chapitre III de The Fantasy.

## Jouer

Ouvrez [Jouer.html](Jouer.html), puis choisissez **Jouer** et **Les Cloches de Sel**. Le chapitre V se débloque à la fin du IV. Le bouton **Continuer la campagne** garde le même héros, ses talents et son équipement. Le chapitre VI reste visible au menu avec la mention **En travaux**.

Dans **Paramètres → Langue de l’interface**, choisissez le français, l’anglais, l’allemand, l’espagnol, le polonais ou le chinois simplifié, puis sélectionnez **Appliquer**. La langue s’applique à l’interface et au récit. Le journal conserve les anciens messages dans leur langue d’origine.

Si le navigateur bloque la sauvegarde depuis un fichier local, lancez `python -m http.server 8765` depuis ce dossier et ouvrez [le jeu sur localhost](http://127.0.0.1:8765/Jouer.html).

## La campagne

| Chapitre | Monde | Étapes | Boss | Classes ajoutées |
| --- | --- | ---: | ---: | ---: |
| IV · Les Cloches de Sel | Nacre, la cité qui perd ses noms | 100 | 5 | 5 |
| V · Le Désert des Heures | Aurive, la ville qui répète la même journée | 200 | 10 | 5 |
| VI · Le Jardin du Dernier Ciel (en travaux) | Orrée, les îles qui font pousser les souvenirs | 300 | 15 | 5 |

Un secteur compte 20 scènes, deux actions par scène et un boss. La campagne réunit 35 classes, dont 15 nouvelles. Les classes locales se débloquent dans leur chapitre. Pour choisir une classe nouvellement disponible, commencez ce chapitre depuis son écran de sélection.

- Le choix de guide modifie des scènes dans chaque secteur. Trois indices permettent au guide d’intervenir au prochain duel.
- À la 17e étape d’un secteur, la quête du guide peut donner une relique une fois par chapitre. Le dernier choix du chapitre décide de l’épilogue.
- Les boss peuvent se mettre en garde, accélérer leur rythme, percer une partie de la défense ou affaiblir la prochaine potion. Leur intention s’affiche avant l’action.
- Après un boss, le camp restaure une partie des PV, recharge une potion si le sac le permet et renouvelle trois repos. En cas de défaite, **Reprendre au dernier camp** restaure la dernière étape sûre.
- Le journal contient les quêtes, les décisions récentes, les secteurs et le bestiaire. La chronique affiche 28 trophées. Le platine demande les objectifs principaux. Les autres trophées suivent les routes, les épilogues, la spécialisation et les nouvelles classes.
- Il y a une place par type d’équipement. Changer d’arme, d’armure ou de relique remplace l’objet du même type.

Cette campagne utilise une sauvegarde et un profil propres. Les chapitres IV et V utilisent 28 sprites fixes fournis par le joueur pour leurs boss, classes et guides, en plus du Pèlerin de Sel animé. Neuf sprites de boss pour le chapitre VI sont déjà intégrés à la liste des ressources pour sa réouverture.

## Modifier le jeu

- Scènes et boss par monde dans [le chapitre IV](game/js/acts-iv.js), [le chapitre V](game/js/acts-v.js) et [le chapitre VI](game/js/acts-vi.js).
- Règles de construction de la campagne et trophées dans [campaign.js](game/js/campaign.js).
- Les quinze nouvelles classes dans [sequel-classes.js](game/js/sequel-classes.js).
- Les sprites du second opus et leurs dimensions d’origine dans [campaign-art.js](game/js/campaign-art.js). La disponibilité du chapitre VI est réglée par `inDevelopment` dans [sequel-data.js](game/js/sequel-data.js).
- Style des écrans de campagne dans [campaign.css](game/css/campaign.css).
- Les traductions de la campagne sont dans [translations.js](game/js/translations.js). Les textes français servent de clés. Lors d’une modification du récit, mettez aussi à jour les cinq entrées correspondantes. Les traductions mêlent traduction automatique et corrections éditoriales.
- [Crédits des musiques et des sons](docs/CREDITS_AUDIO.md).
- [Direction et priorités pour la suite](docs/DIRECTION_DU_JEU.md) et [provenance des ressources reprises](docs/RESSOURCES_2.7.md).
