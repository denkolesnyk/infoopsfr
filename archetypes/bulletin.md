---
# ─────────────────────────────────────────────────────────────────────────
#  BULLETIN BIMENSUEL — « La France dans les médias russes »
#  Créer avec :  hugo new content posts/la-france-dans-les-medias-russes-NN.md --kind bulletin
#  Supprimer tous les commentaires (#) et les blocs <!-- --> avant publication.
# ─────────────────────────────────────────────────────────────────────────

title: "La France dans les médias russes — n° NN"
date: {{ .Date }}

# 160-200 caractères. Sert de méta-description, de vignette sociale et de
# résumé sur la page d'accueil. Annoncer le résultat, pas le sujet.
description: "Bulletin du JJ au JJ MOIS AAAA : NARRATIF DOMINANT, et ce qui a changé depuis le n° NN-1."

series: ["La France dans les médias russes"]
numero: NN

# Fenêtre d'observation (≠ date de publication). Format ISO, pour pouvoir
# reconstruire une série temporelle à partir des bulletins.
periode_debut: "AAAA-MM-JJ"
periode_fin: "AAAA-MM-JJ"

# Chiffres du corpus, tels que renvoyés par DFN. Renseignés ici pour rester
# exploitables par machine ; repris en clair dans le bloc Méthodologie.
corpus:
  version: "v1"          # version du corpus figé — à incrémenter si la liste de sources change
  messages: 0            # nombre de messages collectés sur la fenêtre
  canaux: 0              # nombre de canaux / sources ayant produit ces messages
  clusters: 0            # nombre de clusters retenus après regroupement
  archive_id: 0          # id du snapshot dans backend/archive.sqlite

# Thèmes, pays, acteurs. Vocabulaire libre.
tags: ["France", "Russie", "Telegram"]

# Narratifs récurrents observés dans CE bulletin. Vocabulaire CONTRÔLÉ :
# reprendre à l'identique les libellés déjà utilisés, ne créer une nouvelle
# entrée que pour un narratif réellement inédit. C'est cette discipline qui
# transforme la série en catalogue exploitable.
#   ex. "France néocoloniale au Sahel", "Macron va-t-en-guerre",
#       "France en déclin social", "Fatigue face aux réfugiés ukrainiens"
narratifs: []

# Capture la plus parlante du bulletin — sert aussi de vignette sociale.
image: "/images/NOM_DU_FICHIER.webp"

draft: true
---

<!-- CHAPÔ — 2 à 3 phrases, sans titre. Ce que retient un lecteur qui
     ne lira rien d'autre : le fait dominant de la quinzaine, et son
     caractère nouveau ou non. Pas de méthodologie ici. -->

TEXTE DU CHAPÔ.

## En bref

<!-- 3 à 5 puces. Une observation par puce, chiffrée quand c'est possible.
     Écrire des constats, pas des titres de section. -->

- CONSTAT 1.
- CONSTAT 2.
- CONSTAT 3.

## Narratifs dominants

<!-- ═══ DFN → onglet Narratives ═══
     Un bloc `###` par cluster retenu (3 à 5 maximum — au-delà, le bulletin
     devient un inventaire illisible). Pour chaque cluster :
       • le libellé du narratif, repris de `narratifs:` ci-dessus ;
       • le volume et la part du corpus ;
       • le résumé produit par /narrative-summary, RÉÉCRIT — jamais collé tel
         quel : la sortie du modèle est une note de travail, pas une
         publication ;
       • les cadrages divergents entre sources (champ `framings`) ;
       • la tonalité, si elle est nettement orientée.
     Ne conserver que les clusters sur lesquels vous pouvez porter un
     jugement. Un cluster que vous ne comprenez pas ne se publie pas. -->

### 1. LIBELLÉ DU NARRATIF

**Volume :** N messages · N canaux · N % du corpus
**Tonalité :** négative / neutre / mixte

DESCRIPTION DU NARRATIF : de quoi il s'agit, qui le porte, sur quel registre.

Les cadrages divergent selon les sources : SOURCE A CADRE AINSI, tandis que
SOURCE B CADRE AUTREMENT.

{{< figure src="/images/NOM.webp"
           alt="Description factuelle et complète, pour lecteurs d'écran."
           caption="Ce que la capture montre et pourquoi elle est retenue."
           source="Capture : NOM DU CANAL, JJ MOIS AAAA" >}}

### 2. LIBELLÉ DU NARRATIF

<!-- idem -->

## Signaux de coordination

<!-- ═══ DFN → analyzeCoordination ═══
     À ne conserver QUE si le résultat est significatif : reprises quasi
     identiques, délais de transfert anormalement courts, arrivée simultanée
     sur des canaux sans lien apparent.
     Formuler ce qui est observé (« N canaux ont publié un texte identique
     en moins de N minutes »), pas ce qui est supposé. L'attribution à un
     commanditaire ne se déduit pas d'un délai de propagation.
     Rien de probant cette quinzaine ? Supprimer la section — ne pas
     meubler. -->

OBSERVATION, avec délai, nombre de canaux et étendue de la reprise.

## Acteurs et cibles

<!-- ═══ DFN → onglet Entities (NER + stance) ═══
     Les entités françaises les plus citées et la posture adoptée à leur
     égard. Utile surtout en variation : qui entre, qui sort, qui change de
     traitement par rapport au bulletin précédent. -->

| Entité | Occurrences | Posture dominante | Évolution |
| --- | --- | --- | --- |
| NOM | N | négative | ↑ nouveau |
| NOM | N | neutre | → stable |

## Évolution depuis le bulletin précédent

<!-- LA SECTION QUI FAIT LA SÉRIE. Sans elle, chaque bulletin est un
     instantané isolé ; avec elle, la collection devient une observation
     continue. Trois questions, dans cet ordre :
       • quels narratifs progressent, lesquels reculent ?
       • qu'est-ce qui apparaît pour la première fois ?
       • qu'est-ce qui a DISPARU ?
     Les constats négatifs (« le thème X, dominant en n° NN-1, est absent
     de ce corpus ») ont autant de valeur que les constats positifs, et
     presque personne ne les publie. -->

CE QUI PROGRESSE. CE QUI RECULE. CE QUI DISPARAÎT.

## À suivre

<!-- 2 ou 3 points de vigilance pour la quinzaine suivante, formulés de
     façon vérifiable : on doit pouvoir dire au prochain bulletin si cela
     s'est produit ou non. -->

- POINT DE VIGILANCE 1.
- POINT DE VIGILANCE 2.

{{< methodology >}}
Collecte et analyse : Denys Kolesnyk pour Info Ops France.
N messages issus de N canaux Telegram russophones, collectés entre le
JJ MOIS AAAA et le JJ MOIS AAAA sur le [corpus de référence](/corpus/) (vN),
figé et inchangé depuis le bulletin n° NN.
Regroupement thématique par similarité sémantique, puis relecture humaine :
les N clusters retenus ont tous été vérifiés manuellement. Les résumés
générés automatiquement ont servi de notes de travail et ont été réécrits.
Les messages bruts sont conservés (snapshot #N), y compris ceux supprimés
depuis leur collecte, et sont disponibles pour vérification sur demande.
{{< /methodology >}}
