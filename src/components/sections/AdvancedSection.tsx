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
            </div>

            {/* Checksum */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Comparaison par checksum
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Par défaut, rsync compare date de modification + taille
# --checksum force une vérification par somme de contrôle (plus lent mais plus fiable)
rsync -avhc /source/ /dest/

# Utile quand les timestamps ne sont pas fiables
# (ex: copie depuis un système FAT/NTFS)`}
                />
            </div>

            {/* itemize-changes */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Comprendre --itemize-changes
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Affiche un résumé codé de chaque changement
rsync -avhi /source/ /dest/

# Format de sortie : YXcstpoguax
# Y = type de mise à jour : < envoyé, > reçu, c créé, h hardlink, . pas de transfert, * message
# X = type de fichier : f fichier, d dossier, L symlink
# c = checksum différent
# s = taille différente
# t = timestamp différent
# p = permissions différentes
# o = owner différent
# g = group différent

# Exemples :
# >f.st...... fichier reçu, taille et timestamp modifiés
# .d..t...... dossier avec timestamp modifié
# *deleting   fichier supprimé`}
                />
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
