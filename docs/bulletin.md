# Rédiger un bulletin « Présidentielle 2027 : la France dans les médias russes »

Guide de rédaction du bulletin bimensuel.

La série suit le traitement réservé par les médias russophones aux acteurs
politiques français dans les mois qui précèdent l'élection présidentielle du
18 avril 2027. Elle est numérotée à partir de 1. Les bulletins hebdomadaires
de janvier-mai 2022, publiés sous le titre « La France dans les médias russes »,
ne constituent pas une série au sens du site : ils restent consultables dans
l'archive et ne sont ni renumérotés ni rattachés à la taxonomie `bulletins`.

Ce fichier n'est pas publié : il vit dans le dépôt, à côté de l'archétype,
pour que les consignes ne soient ni recopiées dans chaque bulletin ni perdues
quand on nettoie le fichier.

## Créer le fichier

```bash
hugo new content posts/presidentielle-2027-medias-russes-NN.md --kind bulletin
```

Le `--kind bulletin` est obligatoire : sans lui, Hugo utilise
`archetypes/default.md` et produit un squelette vide.

## Champs de l'en-tête

| Champ | Rôle |
| --- | --- |
| `title` | Titre de référence : onglet, moteurs de recherche, flux RSS, archive. Format : `Présidentielle 2027 : la France dans les médias russes n° N`, numéro non paddé. |
| `headline` | Titre affiché sur le site et sur la vignette de partage. Un constat, pas le nom de la série (celle-ci figure déjà dans le surtitre). |
| `chapeau` | Une phrase sous le titre, qui le complète sans le répéter. |
| `description` | **160 caractères au plus.** Ne sert plus qu'aux moteurs de recherche et aux aperçus de partage. |
| `numero` | **Toujours entre guillemets et sur deux chiffres** (`"01"`, `"02"`, … `"12"`). Non quoté, YAML lit `07` comme l'entier 7 et `08` comme la chaîne « 08 ». Le surtitre affiche « Bulletin n° 3 ». |
| `periode_debut` / `periode_fin` | Fenêtre d'observation, à ne pas confondre avec la date de publication. Format ISO. Le surtitre de l'article affiche la période. |
| `tags` | Vocabulaire **fermé**, neuf tags : France, Russie, Ukraine, Afrique, Telegram, Élections, Désinformation, Guerre informationnelle, Réseaux sociaux. Un bulletin : `["France", "Russie", "Telegram", "Élections"]`. La série passe par `bulletins`, pas par un tag. |
| `narratifs` | Narratifs observés dans CE bulletin. Vocabulaire **contrôlé** : reprendre à l'identique les libellés déjà utilisés. |
| `image` | Capture la plus parlante : couverture de l'article et image à la une de l'accueil. Laisser vide tant qu'il n'y a pas d'image. |
| `legende_image` | Légende de la couverture : `MÉDIA : « citation traduite ». Capture Telegram, traduction Info Ops France.` |
| `draft` | Passer à `false` au moment de publier. |

La vignette de partage (X, Facebook) est générée automatiquement à partir du
surtitre et de `headline`. Aucune date de mise à jour n'est affichée.

`narratifs` n'est affiché par aucun gabarit : il sert à documenter le
bulletin et à le traiter plus tard par machine.

**Ne jamais laisser de commentaire `#` dans l'en-tête.** L'ancienne version de
l'archétype en contenait, et supprimer un bloc de commentaires en laissant la
ligne `---` qui le suivait referme l'en-tête après `date` : tout le reste
devient du corps de texte, `draft: true` cesse de s'appliquer et le bulletin
part en production avec ses gabarits apparents.

## Structure du corps

**Introduction** — un paragraphe, sans titre : la période, le corpus, ce qui
change depuis le numéro précédent. (Le résumé affiché sur l'accueil vient de
`chapeau`, pas de ce paragraphe.)

**En bref** — 3 à 5 puces. Une observation par puce, chiffrée quand c'est
possible. Écrire des constats, pas des titres de section.

**Narratifs dominants** — *source : DFN, onglet Narratives.* Un bloc `###` par
cluster retenu, 3 à 5 maximum : au-delà, le bulletin devient un inventaire
illisible. Pour chaque cluster :

- le libellé du narratif, repris de `narratifs:` ;
- le volume et la part du corpus ;
- le résumé produit par `/narrative-summary`, **réécrit** — jamais collé tel
  quel : la sortie du modèle est une note de travail, pas une publication ;
- les cadrages divergents entre sources (champ `framings`) ;
- la tonalité, si elle est nettement orientée.

Ne conserver que les clusters sur lesquels vous pouvez porter un jugement. Un
cluster que vous ne comprenez pas ne se publie pas.

**Tonalité** — sous chaque `###`, la ligne `**Tonalité :** mixte`, exactement
sous cette forme : le gabarit la transforme en étiquette.

**Graphique** — le shortcode `courbes`, avec un champ `"titre"`.

**Signaux de coordination** — *source : DFN, `analyzeCoordination`.* À ne
conserver que si le résultat est significatif : reprises quasi identiques,
délais de transfert anormalement courts, arrivée simultanée sur des chaînes sans
lien apparent. Formuler ce qui est observé (« N chaînes ont publié un texte
identique en moins de N minutes »), pas ce qui est supposé : l'attribution à un
commanditaire ne se déduit pas d'un délai de propagation. Rien de probant cette
quinzaine ? Supprimer la section — ne pas meubler.

**Acteurs et cibles** — *source : DFN, onglet Entities (NER + stance).*
Tableau suivi, sur la ligne juste en dessous, de
`{caption="Personnalités politiques françaises mentionnées, période"}`.
Ne lister que les entités effectivement mentionnées. Les
entités françaises les plus citées et la posture adoptée à leur égard. Utile
surtout en variation : qui entre, qui sort, qui change de traitement par
rapport au bulletin précédent.

**Évolution depuis le bulletin précédent** — la section qui fait la série.
Sans objet pour le n° 1, qui pose la ligne de base : la supprimer plutôt que
de la comparer aux bulletins de 2022, dont le corpus et la périodicité sont
autres. Sans
elle, chaque bulletin est un instantané isolé ; avec elle, la collection
devient une observation continue. Trois questions, dans cet ordre : quels
narratifs progressent, lesquels reculent ? Qu'est-ce qui apparaît pour la
première fois ? Qu'est-ce qui a **disparu** ? Les constats négatifs (« le thème
X, dominant en n° NN-1, est absent de ce corpus ») ont autant de valeur que les
constats positifs, et presque personne ne les publie.

**Méthodologie** — en fin de fichier, une ligne `---` puis un paragraphe
commençant par « Collecte et analyse : ». Le gabarit en fait le bloc
« Méthodologie et données ». Court, quatre ou cinq lignes :
la fenêtre de collecte, le nombre de messages et de chaînes suivies, la nature
de ces chaînes (agences et médias d'État, presse russe, chaînes d'opinion,
blogueurs et influenceurs), et le cas échéant une ligne sur les messages
écartés parce qu'un mot-clé a produit des faux positifs.

## Images

Les fichiers vont dans `static/images/`, référencés en `/images/nom.webp`.

```
{{< figure src="/images/nom.webp"
           float="right"
           zoom="true"
           alt="Traduction complète du message, pour lecteurs d'écran."
           caption="Une ligne : MÉDIA : « citation courte »."
           source="Capture Telegram, traduction Info Ops France." >}}
```

Une capture Telegram : `float="right"` (elle se place dans la marge de
droite). Un graphique ou un schéma : sans `float`, il occupe toute la largeur.
La traduction intégrale va dans `alt`, pas dans `caption`. Si l'image de
couverture est aussi utilisée dans le corps, elle n'est affichée qu'une fois.

## Relecture avant publication

- `draft: false` ;
- aucun gabarit en majuscules (`NARRATIF`, `NOM`, `JJ MOIS AAAA`) ne subsiste ;
- `numero` entre guillemets et sur deux chiffres ;
- `headline`, `chapeau`, `legende_image` renseignés ; `description` ≤ 160 signes ;
- la fenêtre `periode_debut` / `periode_fin` correspond bien à celle de la
  collecte ;
- `image` pointe vers un fichier qui existe dans `static/images/` ;
- les libellés de `narratifs` reprennent ceux des bulletins précédents ;
- `hugo server -D` pour prévisualiser, puis `hugo` pour vérifier que le
  bulletin n'apparaît pas tant qu'il est en brouillon.
