# QCM de la conseillère Neolis

Pour chaque message du client, la bonne réponse est celle de l'opératrice, et les trois autres sont des distracteurs. Ces distracteurs sont de trois sortes : une fausse piste technique, une réponse de script qui ignore ce que le client a dit, et une réponse froide ou qui rejette la responsabilité. La position de la bonne réponse varie d'une question à l'autre. Le corrigé est à la fin.

Ce fichier est la source. Après modification, régénérez `qcm-neolis.js`, que lit l'écran de l'agent : `python3 scripts/build_qcm.py`.

## Items

**1. Bonjour, ça fait trois jours que je n'ai plus internet, c'est inadmissible.**  
A. Avez-vous essayé de redémarrer votre box ?  
B. Désolée pour ces trois jours. Votre numéro client, s'il vous plaît ?  
C. Je ne peux rien faire sans votre numéro client.  
D. Trois jours, ce n'est pas si long pour une panne.

**2. Mon numéro client, c'est le 4471 2208.**  
A. Ce numéro n'existe pas dans notre système.  
B. Merci. Votre box est-elle bien allumée ?  
C. Merci. Il me faut aussi votre date de naissance et votre code postal.  
D. Merci. Vous êtes bien au 12 rue des Tilleuls ?

**3. Oui. Et le téléphone fixe ne marche plus non plus.**  
A. Normal, il passe par la box. Depuis quand ?  
B. Pour le fixe, il faut contacter un autre service.  
C. Ce sont sans doute deux pannes différentes.  
D. Avez-vous vérifié que votre téléphone est bien chargé ?

**4. Depuis jeudi matin, vers 9 heures.**  
A. Jeudi ? Pourquoi ne pas avoir appelé plus tôt ?  
B. Noté. Je vous envoie une nouvelle box.  
C. Noté. Quel voyant voyez-vous sur la box ?  
D. Les pannes de plus de 48 heures ne relèvent pas de mon service.

**5. Un voyant rouge qui clignote.**  
A. La box ne reçoit plus de signal. Elle n'est pas forcément en panne.  
B. Votre box est en panne, il faut la changer.  
C. Le voyant rouge, c'est normal, ne vous inquiétez pas.  
D. Débranchez la box et attendez dix minutes.

**6. J'ai déjà redémarré trois fois, ne me demandez pas de le refaire.**  
A. Redémarrez-la une quatrième fois, en attendant trente secondes.  
B. Êtes-vous sûr de l'avoir fait correctement ?  
C. Entendu. Ce n'est donc pas un blocage de la box.  
D. La procédure impose un redémarrage pendant l'appel.

**7. Le câble est bien branché, j'ai vérifié.**  
A. Débranchez-le et rebranchez-le quand même.  
B. Merci. Il n'est ni plié ni pincé ?  
C. Les clients se trompent souvent sur ce point.  
D. Alors c'est forcément la box.

**8. Non, rien n'a bougé chez moi.**  
A. Alors je ne vois pas d'où vient le problème.  
B. Il faudrait vérifier tous vos câbles un par un.  
C. Je vous programme un technicien à domicile.  
D. Parfait. Je teste votre ligne à distance.

**9. D'accord, j'attends.**  
A. Le test est concluant : votre ligne fonctionne.  
B. Aucun signal : votre box est hors service.  
C. Aucun signal sur la ligne. Je vérifie les incidents dans votre secteur.  
D. Le test a échoué, je ne peux rien faire de plus.

**10. Mes voisins ont internet, eux.**  
A. Donc seule votre ligne est touchée. Il y a eu des travaux fibre dans votre rue, terminés jeudi.  
B. Vos voisins n'ont peut-être pas le même opérateur.  
C. Aucun incident n'est signalé, le problème vient de chez vous.  
D. Chaque ligne est différente, cela ne prouve rien.

**11. Jeudi ? C'est le jour où ça a coupé.**  
A. C'est une simple coïncidence, l'incident est clos.  
B. Les travaux ne concernent pas les lignes individuelles.  
C. Je ne suis pas habilitée à commenter les travaux.  
D. Exactement. Votre fibre a sûrement été débranchée à l'armoire de rue pendant les travaux.

**12. Donc ce n'est pas ma box ?**  
A. Si, par précaution, je vous en envoie une nouvelle.  
B. Très probablement pas. La changer ne servirait à rien.  
C. Impossible à dire, il faudrait tout tester.  
D. Si, les box de cette génération tombent souvent en panne.

**13. On m'avait promis un technicien lundi, personne n'est venu.**  
A. Je n'ai aucune trace de ce rendez-vous.  
B. Les techniciens sont des sous-traitants, ce n'est pas de notre ressort.  
C. Je le vois, et je vous présente nos excuses. Il n'aurait de toute façon rien trouvé chez vous.  
D. Je vous en programme un nouveau pour lundi prochain.

**14. Alors, concrètement, vous faites quoi ?**  
A. J'ouvre un ticket prioritaire pour rebrancher votre ligne à l'armoire. Votre présence n'est pas nécessaire.  
B. Je vous envoie une nouvelle box par la poste.  
C. Je vous conseille de rappeler dans 48 heures.  
D. Je transmets votre demande, on vous recontactera.

**15. Ça va prendre combien de temps ?**  
A. Je ne peux vous donner aucun délai.  
B. C'est réglé dans l'heure, c'est promis.  
C. Comptez deux à trois semaines.  
D. En général moins de 48 heures.

**16. Encore 48 heures ? Je suis en télétravail.**  
A. Le télétravail n'est pas couvert par votre contrat.  
B. Je comprends. Votre mobile est chez nous ?  
C. Vous pouvez aller dans un café avec wifi en attendant.  
D. Je ne peux malheureusement rien faire de plus.

**17. Oui.**  
A. Je vous offre 100 Go d'internet mobile jusqu'au rétablissement.  
B. Vous pouvez acheter une recharge de données en boutique.  
C. Alors utilisez votre forfait mobile en attendant.  
D. Ça ne change rien pour votre ligne fixe.

**18. Et les appels sur mon fixe ?**  
A. Les appels sont perdus, je n'y peux rien.  
B. Prévenez vos correspondants de vous appeler sur le mobile.  
C. Je peux les renvoyer vers votre mobile. Je l'active ?  
D. Le renvoi d'appel est une option payante à 5 euros par mois.

**19. Oui, faites-le.**  
A. Il faut l'activer vous-même depuis votre espace client.  
B. Je ne peux pas, il faut passer par le service technique.  
C. Ce sera actif sous dix jours.  
D. C'est fait.

**20. Je serai remboursé ?**  
A. Non, les coupures de moins d'une semaine ne sont pas remboursées.  
B. Oui : un avoir pour tous les jours de coupure, plus un geste pour le rendez-vous manqué.  
C. Il faut envoyer une réclamation par courrier recommandé.  
D. Peut-être, ce n'est pas moi qui décide.

**21. Comment je saurai que c'est réparé ?**  
A. Par SMS. Le voyant passera au blanc.  
B. Testez votre connexion de temps en temps.  
C. Rappelez-nous pour le savoir.  
D. Le technicien vous appellera, peut-être.

**22. Et si ça ne marche toujours pas dans 48 heures ?**  
A. Rappelez-nous et on recommencera le diagnostic.  
B. Ça marchera, ne vous inquiétez pas.  
C. Vous pourrez alors résilier votre abonnement.  
D. Le ticket remonte automatiquement à un responsable, qui vous appellera.

**23. Je peux avoir un numéro de dossier ?**  
A. Les numéros de dossier sont internes, je ne peux pas vous le donner.  
B. Vous le trouverez dans votre espace client d'ici quelques jours.  
C. INC-58317. Je vous l'envoie par SMS.  
D. Pas besoin, votre numéro client suffit.

**24. Vous pouvez récapituler ?**  
A. Tout est indiqué dans le SMS que vous allez recevoir.  
B. Ligne rebranchée sous 48 heures, 100 Go offerts, renvoi des appels activé, avoir sur la prochaine facture.  
C. Un technicien passera chez vous et changera la box.  
D. Nous avons fait le nécessaire, tout va rentrer dans l'ordre.

**25. Bon, merci. J'espère que ça va marcher cette fois.**  
A. Tout est consigné dans votre dossier. Merci de votre patience, et encore désolée.  
B. Je ne peux rien vous garantir.  
C. Bonne journée.  
D. Si ça ne marche pas, ce ne sera pas de notre faute.

## Corrigé

**Corrigé :** 1 B · 2 D · 3 A · 4 C · 5 A · 6 C · 7 B · 8 D · 9 C · 10 A · 11 D · 12 B · 13 C · 14 A · 15 D · 16 B · 17 A · 18 C · 19 D · 20 B · 21 A · 22 D · 23 C · 24 B · 25 A

## Limite connue

Le dialogue est linéaire : quelle que soit la réponse choisie, le client enchaîne sur le message suivant. Après un mauvais choix, certains enchaînements sonnent faux (par exemple le message 12 si l'opératrice a parlé de box en panne). Si cette discontinuité doit rester invisible au sujet, il faudra des répliques client neutres ou quelques branchements.
