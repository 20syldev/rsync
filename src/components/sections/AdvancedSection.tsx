import { CodeBlock } from '../CodeBlock';
import { Badge } from '../Badge';
import { Zap, Lightbulb } from 'lucide-react';

export const AdvancedSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Options avancées
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Maîtrisez les options avancées de rsync pour des synchronisations précises et
                    optimisées.
                </p>
            </div>

            {/* Filtrage avancé */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Filtrage avancé avec --exclude et --include
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Les règles de filtrage sont évaluées dans l'ordre. La première règle qui
                    correspond l'emporte.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# Inclure UNIQUEMENT les fichiers .php et .html, exclure tout le reste
rsync -avh \\
  --include='*.php' \\
  --include='*.html' \\
  --exclude='*' \\
  /var/www/ /backup/www/

# Utiliser un fichier de filtres pour des règles complexes
rsync -avh --filter='merge /etc/rsync-filters.txt' /source/ /dest/`}
                />
                <CodeBlock
                    title="exclude-list.txt"
                    code={`# Fichiers temporaires
*.tmp
*.swp
*~

# Dossiers de build
node_modules/
__pycache__/
.cache/
dist/
build/

# Fichiers de version control
.git/
.svn/

# Logs
*.log
logs/`}
                />
            </div>

            {/* --delete */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Variantes de --delete
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Option
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Comportement
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">--delete</td>
                                <td className="py-3 px-4">
                                    Supprime les fichiers absents de la source (par défaut : avant
                                    le transfert).
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">--delete-before</td>
                                <td className="py-3 px-4">
                                    Supprime d'abord, puis transfère. Libère de l'espace disque
                                    avant la copie.
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">--delete-during</td>
                                <td className="py-3 px-4">
                                    Supprime au fur et à mesure du scan. Plus rapide pour les grands
                                    ensembles de fichiers.
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">--delete-after</td>
                                <td className="py-3 px-4">
                                    Transfère d'abord, supprime ensuite. Plus sûr car les fichiers
                                    sont copiés avant suppression.
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-mono">--delete-excluded</td>
                                <td className="py-3 px-4">
                                    Supprime aussi les fichiers exclus par{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        --exclude
                                    </code>{' '}
                                    dans la destination.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/10 mt-3">
                    <p className="text-sm text-red-800 dark:text-red-300">
                        <strong>
                            <Zap size={16} className="inline mr-1" /> Danger :
                        </strong>{' '}
                        <code className="bg-red-100 dark:bg-red-800/30 px-1 rounded">--delete</code>{' '}
                        supprime définitivement des fichiers ! Testez <strong>toujours</strong> avec{' '}
                        <code className="bg-red-100 dark:bg-red-800/30 px-1 rounded">
                            --dry-run
                        </code>{' '}
                        avant.
                    </p>
                </div>
            </div>

            {/* Backup */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Sauvegardes avec --backup
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Conserver les anciennes versions dans un dossier de backup
rsync -avh --backup --backup-dir=/backup/old/$(date +%F) \\
  --delete /home/user/data/ /backup/data/

# Les fichiers modifiés ou supprimés sont déplacés vers
# /backup/old/2026-02-07/ avant d'être écrasés`}
                />
            </div>

            {/* Reprise de transfert */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Reprise de transfert interrompu
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# --partial conserve les fichiers partiellement transférés
# --partial-dir stocke les partiels dans un dossier dédié (plus propre)
rsync -avhP --partial-dir=.rsync-partial \\
  user@serveur:/data/gros-fichier.tar.gz /local/

# Si le transfert est interrompu, relancez la même commande :
# rsync reprendra automatiquement là où il s'est arrêté`}
                />
            </div>

            {/* Compression */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Compression
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Compression standard (zlib)
rsync -avz /source/ user@serveur:/dest/

# Compression zstd (rsync 3.2.3+) — plus rapide et meilleur ratio
rsync -avz --compress-choice=zstd /source/ user@serveur:/dest/

# Compression lz4 (rsync 3.2.3+) — ultra-rapide, ratio moindre
rsync -avz --compress-choice=lz4 /source/ user@serveur:/dest/

# Désactiver la compression pour les fichiers déjà compressés
rsync -av --no-compress /source/*.gz user@serveur:/dest/`}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    <Badge variant="accent">rsync 3.2.3+</Badge> Les algorithmes zstd et lz4
                    nécessitent rsync 3.2.3+ sur les deux machines.
                </p>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-4">
                    Quel algorithme choisir ?
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Algorithme
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Vitesse
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Ratio
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Cas d'usage
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">zlib (défaut)</td>
                                <td className="py-2 px-4">Moyen</td>
                                <td className="py-2 px-4">Bon</td>
                                <td className="py-2 px-4">
                                    Compatibilité maximale (rsync &lt; 3.2 côté serveur)
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">zstd</td>
                                <td className="py-2 px-4">Rapide</td>
                                <td className="py-2 px-4">Meilleur</td>
                                <td className="py-2 px-4">
                                    WAN avec rsync 3.2.3+ des deux côtés — recommandé
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">lz4</td>
                                <td className="py-2 px-4">Très rapide</td>
                                <td className="py-2 px-4">Moyen</td>
                                <td className="py-2 px-4">
                                    LAN rapide où la vitesse CPU prime sur le ratio
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono">aucune</td>
                                <td className="py-2 px-4">N/A</td>
                                <td className="py-2 px-4">N/A</td>
                                <td className="py-2 px-4">
                                    LAN Gigabit, ou fichiers déjà compressés (.gz, .zip, .jpg,
                                    .mp4)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Astuce :
                        </strong>{' '}
                        N'utilisez jamais{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-z</code>{' '}
                        sur des fichiers déjà compressés — la compression ne fera que consommer du
                        CPU sans gain. Utilisez{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            --skip-compress
                        </code>{' '}
                        pour les exclure :
                    </p>
                    <CodeBlock
                        code={`rsync -avhz --compress-choice=zstd \\
  --skip-compress=gz/bz2/xz/zip/jpg/jpeg/png/mp4/mkv \\
  /source/ user@serveur:/dest/`}
                    />
                </div>
            </div>

            {/* Checksum */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Comparaison par checksum
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Par défaut, rsync décide de transférer un fichier si sa{' '}
                    <strong>taille ou sa date de modification diffèrent</strong>. Si les deux sont
                    identiques, rsync suppose que le fichier est inchangé et ne lit pas son contenu.{' '}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">--checksum</code>{' '}
                    (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">-c</code>) force
                    rsync à calculer un hash pour chaque fichier afin de comparer le contenu réel.
                    C'est 10 à 50× plus lent sur de grands ensembles, mais détecte les corruptions
                    silencieuses.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# Cas 1 : après une copie depuis FAT/NTFS (timestamps peu fiables)
rsync -avhc /mnt/windows/data/ /backup/

# Cas 2 : audit d'intégrité — vérifier sans rien modifier
rsync -avhcn /home/user/ /backup/user/
# Le dry-run avec --checksum liste les fichiers corrompus sans les retransférer

# Cas 3 : timestamps artificiels (touch, tar --preserve-permissions)
# --size-only ignore les timestamps et compare seulement la taille
rsync -avh --size-only /archive/ /dest/`}
                />
            </div>

            {/* itemize-changes */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Comprendre --itemize-changes
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Affiche un résumé codé de chaque changement (format : YXcstpoguax)
rsync -avhi /source/ /dest/`}
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 my-3">
                    Chaque ligne commence par un code de 11 caractères. Voici comment le lire :
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Position
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Valeurs possibles
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Signification
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">Y — Action</td>
                                <td className="py-2 px-4 font-mono">&lt; &gt; c h . *</td>
                                <td className="py-2 px-4">
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">&lt;</code> envoyé vers dest,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">&gt;</code> reçu depuis dest,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">c</code> créé localement,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">h</code> hard link,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">.</code> pas de transfert (métadonnée seulement),{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">*</code> message système
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">X — Type</td>
                                <td className="py-2 px-4 font-mono">f d L D S</td>
                                <td className="py-2 px-4">
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">f</code> fichier régulier,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">d</code> dossier,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">L</code> lien symbolique,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">D</code> device,{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">S</code> socket
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">c</td>
                                <td className="py-2 px-4 font-mono">c .</td>
                                <td className="py-2 px-4">Checksum différent (contenu modifié)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">s</td>
                                <td className="py-2 px-4 font-mono">s .</td>
                                <td className="py-2 px-4">Taille (size) différente</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">t</td>
                                <td className="py-2 px-4 font-mono">t .</td>
                                <td className="py-2 px-4">Timestamp (mtime) différent</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">p</td>
                                <td className="py-2 px-4 font-mono">p .</td>
                                <td className="py-2 px-4">Permissions différentes</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">o</td>
                                <td className="py-2 px-4 font-mono">o .</td>
                                <td className="py-2 px-4">Owner (propriétaire uid) différent</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold">g</td>
                                <td className="py-2 px-4 font-mono">g .</td>
                                <td className="py-2 px-4">Group (gid) différent</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono font-bold">a x</td>
                                <td className="py-2 px-4 font-mono">a x .</td>
                                <td className="py-2 px-4">ACL ou attributs étendus (xattr) différents</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CodeBlock
                    title="Exemples décodés"
                    code={`>f.st......  fichier envoyé, taille (s) et timestamp (t) changés
>f..t......  fichier envoyé, timestamp seulement changé
.d..t......  dossier non transféré, timestamp mis à jour localement
cL.........  lien symbolique créé
*deleting    fichier supprimé (avec --delete)
hf.........  hard link créé (avec --hard-links / -H)
>f.st...og.  fichier envoyé, taille+timestamp+owner+group changés`}
                />
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Lecture rapide :
                        </strong>{' '}
                        Un point{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">.</code>{' '}
                        signifie "inchangé" pour cet attribut. Une ligne entière de points comme{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            .d.........
                        </code>{' '}
                        signifie que le dossier existe déjà à l'identique — rien à faire.
                    </p>
                </div>
            </div>

            {/* Limitation de bande passante */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Limitation de bande passante
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Limiter à 5 Mo/s (valeur en Ko/s)
rsync -avhP --bwlimit=5000 /source/ user@serveur:/dest/

# Limiter à 1 Mo/s
rsync -avhP --bwlimit=1000 /source/ user@serveur:/dest/

# Utile pour ne pas saturer la connexion réseau
# pendant les heures de bureau par exemple`}
                />
            </div>

            {/* Sauvegardes incrémentales avec link-dest */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Sauvegardes incrémentales avec --link-dest
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">--link-dest</code>{' '}
                    crée des hard links vers les fichiers inchangés d'une sauvegarde précédente.
                    Chaque snapshot apparaît complet mais ne consomme que l'espace des fichiers
                    modifiés.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# Créer un snapshot incrémental
LATEST=$(ls -td /backup/daily/*/ | head -1)
rsync -avh --delete \\
  --link-dest="$LATEST" \\
  /home/user/ /backup/daily/$(date +%F)/

# Résultat : chaque dossier /backup/daily/2026-02-07/ contient
# une copie "complète" mais les fichiers inchangés sont des
# hard links → presque aucun espace disque supplémentaire`}
                />
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-4">
                    Vérifier l'espace réellement utilisé
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Apparence : chaque snapshot semble occuper 1,2G
du -sh /backup/daily/*/
# 1,2G    /backup/daily/2026-02-05/
# 1,2G    /backup/daily/2026-02-06/
# 1,2G    /backup/daily/2026-02-07/

# Réalité : le dossier parent n'utilise que 1,4G au total
du -sh /backup/daily/
# 1,4G    /backup/daily/      ← au lieu de 3,6G (3 × 1,2G) !

# Preuve : vérifier qu'un fichier inchangé est partagé par 3 snapshots
stat /backup/daily/2026-02-07/home/user/rapport.pdf | grep Nlink
# Nlink: 3   ← 3 répertoires partagent le même inode`}
                />
                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mt-3">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Limite importante :</strong> les hard links ne fonctionnent qu'au
                        sein du <strong>même système de fichiers</strong>. Si{' '}
                        <code className="bg-amber-100 dark:bg-amber-800/30 px-1 rounded">
                            --link-dest
                        </code>{' '}
                        pointe vers une partition montée différente (ex:{' '}
                        <code className="bg-amber-100 dark:bg-amber-800/30 px-1 rounded">
                            /mnt/nas/
                        </code>
                        ), rsync copiera chaque fichier entièrement sans créer de hard links.
                    </p>
                </div>
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>
                        <Lightbulb size={16} className="inline mr-1" /> Récapitulatif :
                    </strong>{' '}
                    La combinaison la plus courante pour une sauvegarde efficace est{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                        rsync -avhP --delete --exclude-from=excludes.txt
                    </code>
                    . Ajoutez{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                        --link-dest
                    </code>{' '}
                    pour les sauvegardes incrémentales et{' '}
                    <code className="bg-code-100 dark:bg-blue-800/30 px-1 rounded">-z</code> pour
                    les transferts distants.
                </p>
            </div>
        </div>
    );
};
