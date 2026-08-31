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
| `title` | Titre affiché. Format retenu : `Présidentielle 2027 : la France dans les médias russes — n° N` — numéro non paddé, c'est la seule forme lue par un humain. |
| `description` | 160-200 caractères. Méta-description, vignette sociale et résumé sur la page d'accueil. Annoncer le résultat, pas le sujet. |
| `numero` | **Toujours entre guillemets et sur deux chiffres** (`"01"`, `"02"`, … `"12"`). Non quoté, YAML lit `07` comme l'entier 7 et `08` comme la chaîne « 08 » : le type change d'un bulletin à l'autre. Le padding garantit en prime un tri correct, en YAML comme dans la liste des fichiers. |
| `periode_debut` / `periode_fin` | Fenêtre d'observation, à ne pas confondre avec la date de publication. Format ISO, pour pouvoir reconstruire une série temporelle. |
| `tags` | Thèmes, pays, acteurs. Vocabulaire libre. |
| `narratifs` | Narratifs récurrents observés dans CE bulletin. Vocabulaire **contrôlé** : reprendre à l'identique les libellés déjà utilisés, ne créer une entrée que pour un narratif réellement inédit. C'est cette discipline qui transforme la série en catalogue exploitable. Ex. « France néocoloniale au Sahel », « Macron va-t-en-guerre », « France en déclin social », « Fatigue face aux réfugiés ukrainiens ». |
| `image` | Capture la plus parlante du bulletin, qui sert aussi de vignette sociale. Laisser la chaîne vide tant qu'il n'y a pas d'image : le gabarit retombe alors sur le logo. Un chemin qui n'existe pas produit une vignette cassée sur les réseaux. |
| `draft` | Passer à `false` au moment de publier. |

`numero`, `periode_*` et `narratifs` ne sont affichés par aucun
gabarit aujourd'hui : ils servent à documenter le bulletin et à le traiter
plus tard par machine. Les renseigner correctement coûte peu et évite d'avoir
à rouvrir douze fichiers le jour où on les exploitera.

**Ne jamais laisser de commentaire `#` dans l'en-tête.** L'ancienne version de
l'archétype en contenait, et supprimer un bloc de commentaires en laissant la
ligne `---` qui le suivait referme l'en-tête après `date` : tout le reste
devient du corps de texte, `draft: true` cesse de s'appliquer et le bulletin
part en production avec ses gabarits apparents.

## Structure du corps

**Chapô** — 2 à 3 phrases, sans titre. Ce que retient un lecteur qui ne lira
rien d'autre : le fait dominant de la quinzaine, et son caractère nouveau ou
non. Pas de méthodologie ici. C'est ce premier paragraphe qui est repris comme
extrait sur la page d'accueil.

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

**Signaux de coordination** — *source : DFN, `analyzeCoordination`.* À ne
conserver que si le résultat est significatif : reprises quasi identiques,
délais de transfert anormalement courts, arrivée simultanée sur des chaînes sans
lien apparent. Formuler ce qui est observé (« N chaînes ont publié un texte
identique en moins de N minutes »), pas ce qui est supposé : l'attribution à un
commanditaire ne se déduit pas d'un délai de propagation. Rien de probant cette
quinzaine ? Supprimer la section — ne pas meubler.

**Acteurs et cibles** — *source : DFN, onglet Entities (NER + stance).* Les
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

**Méthodologie** — bloc `{{< methodology >}}`. Court, quatre ou cinq lignes :
la fenêtre de collecte, le nombre de messages et de chaînes suivies, la nature
de ces chaînes (agences et médias d'État, presse russe, chaînes d'opinion,
blogueurs et influenceurs), et le cas échéant une ligne sur les messages
écartés parce qu'un mot-clé a produit des faux positifs.

## Images

Les fichiers vont dans `static/images/`, référencés en `/images/nom.webp`.

```
{{< figure src="/images/nom.webp"
           alt="Description factuelle et complète, pour lecteurs d'écran."
           caption="Ce que la capture montre et pourquoi elle est retenue."
           source="Capture : NOM DU CANAL, JJ MOIS AAAA"
           link="https://exemple.org"
           wide="true" >}}
```

`link` et `wide` sont facultatifs. Si l'image de couverture (`image:`) est
aussi utilisée dans le corps, le gabarit ne l'affiche qu'une fois : il détecte
aussi bien `![](…)` que le `src="…"` du shortcode.

## Relecture avant publication

- `draft: false` ;
- aucun gabarit en majuscules (`NARRATIF`, `NOM`, `JJ MOIS AAAA`) ne subsiste ;
- `numero` entre guillemets et sur deux chiffres ;
- la fenêtre `periode_debut` / `periode_fin` correspond bien à celle de la
  collecte ;
- `image` pointe vers un fichier qui existe dans `static/images/` ;
- les libellés de `narratifs` reprennent ceux des bulletins précédents ;
- `hugo server -D` pour prévisualiser, puis `hugo` pour vérifier que le
  bulletin n'apparaît pas tant qu'il est en brouillon.
