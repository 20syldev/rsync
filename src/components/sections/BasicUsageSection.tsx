import { CodeBlock } from '../CodeBlock';
import { AlertTriangle, Lightbulb } from 'lucide-react';

export const BasicUsageSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Utilisation de base
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Les commandes essentielles pour commencer à utiliser rsync au quotidien.
                </p>
            </div>

            {/* Syntaxe fondamentale */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Syntaxe fondamentale
                </h3>
                <CodeBlock
                    title="Syntaxe"
                    code={`rsync [OPTIONS] SOURCE... DESTINATION

# Exemples de syntaxe
rsync -av /source/ /destination/          # Local
rsync -av /source/ user@host:/dest/       # Vers un serveur distant
rsync -av user@host:/source/ /dest/       # Depuis un serveur distant`}
                />
            </div>

            {/* Le slash final */}
            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10">
                <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                    <AlertTriangle size={16} className="inline mr-1" /> Attention au slash final
                    (trailing slash)
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                    Le slash{' '}
                    <code className="bg-amber-100 dark:bg-amber-800/30 px-1 rounded">/</code> à la
                    fin du chemin source change complètement le comportement :
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# AVEC slash final : copie le CONTENU du dossier
rsync -av /home/user/documents/ /backup/
# Résultat : /backup/fichier1.txt, /backup/fichier2.txt

# SANS slash final : copie le dossier LUI-MÊME
rsync -av /home/user/documents /backup/
# Résultat : /backup/documents/fichier1.txt, /backup/documents/fichier2.txt`}
                />
            </div>

            {/* Options essentielles */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    Options essentielles
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Option
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Forme longue
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-a</td>
                                <td className="py-3 px-4 font-mono">--archive</td>
                                <td className="py-3 px-4">
                                    Mode archive : équivaut à{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        -rlptgoD
                                    </code>
                                    . Préserve récursivité, liens, permissions, timestamps, group,
                                    owner, devices.
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-v</td>
                                <td className="py-3 px-4 font-mono">--verbose</td>
                                <td className="py-3 px-4">
                                    Affiche les fichiers transférés. Doublez (
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        -vv
                                    </code>
                                    ) pour plus de détails.
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-h</td>
                                <td className="py-3 px-4 font-mono">--human-readable</td>
                                <td className="py-3 px-4">
                                    Tailles en Ko/Mo/Go plutôt qu'en octets.
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-z</td>
                                <td className="py-3 px-4 font-mono">--compress</td>
                                <td className="py-3 px-4">
                                    Compresse les données pendant le transfert (utile pour les
                                    connexions lentes).
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-P</td>
                                <td className="py-3 px-4 font-mono">--partial --progress</td>
                                <td className="py-3 px-4">
                                    Affiche la progression et conserve les fichiers partiels
                                    (reprise de transfert).
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-n</td>
                                <td className="py-3 px-4 font-mono">--dry-run</td>
                                <td className="py-3 px-4">
                                    Simule l'exécution sans rien modifier.{' '}
                                    <strong>Toujours tester d'abord !</strong>
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-r</td>
                                <td className="py-3 px-4 font-mono">--recursive</td>
                                <td className="py-3 px-4">
                                    Copie récursive dans les sous-dossiers. Déjà inclus dans{' '}
                                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                                        -a
                                    </code>
                                    .
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-mono">--delete</td>
                                <td className="py-3 px-4 font-mono">--delete</td>
                                <td className="py-3 px-4">
                                    Supprime les fichiers dans la destination qui n'existent plus
                                    dans la source (miroir exact).
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Décomposition de -a */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Que signifie <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">-a</code> (--archive) exactement ?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">-a</code> est un
                    raccourci pour sept flags combinés. Voici ce que chacun fait :
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Flag
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Forme longue
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Ce qui est préservé
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-r</td>
                                <td className="py-3 px-4 font-mono">--recursive</td>
                                <td className="py-3 px-4">Copie dans les sous-dossiers</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-l</td>
                                <td className="py-3 px-4 font-mono">--links</td>
                                <td className="py-3 px-4">
                                    Liens symboliques (copié tel quel, pas la cible)
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-p</td>
                                <td className="py-3 px-4 font-mono">--perms</td>
                                <td className="py-3 px-4">
                                    Permissions fichier (chmod — ex: 755, 644)
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-t</td>
                                <td className="py-3 px-4 font-mono">--times</td>
                                <td className="py-3 px-4">
                                    Date de modification (mtime) — critique pour les synchros suivantes
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-g</td>
                                <td className="py-3 px-4 font-mono">--group</td>
                                <td className="py-3 px-4">Groupe propriétaire (gid)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-mono">-o</td>
                                <td className="py-3 px-4 font-mono">--owner</td>
                                <td className="py-3 px-4">
                                    Propriétaire (uid) — nécessite les droits root
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-mono">-D</td>
                                <td className="py-3 px-4 font-mono">--devices --specials</td>
                                <td className="py-3 px-4">
                                    Fichiers device spéciaux et sockets (root uniquement)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Attention :
                        </strong>{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-a</code> ne
                        préserve <strong>pas</strong> les ACL (
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-A</code>),
                        les attributs étendus (
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-X</code>),
                        ni les hard links (
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-H</code>).
                        Pour une sauvegarde système complète, utilisez{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-aAXH</code>.
                    </p>
                </div>
            </div>

            {/* Exemples concrets */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Copie locale simple
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`rsync -avh /home/user/documents/ /mnt/backup/documents/`}
                />
                <CodeBlock
                    title="Sortie terminal"
                    code={`sending incremental file list
rapport.pdf
photos/
photos/vacances.jpg
photos/famille.png

sent 15,42M bytes  received 1,23K bytes  10,28M bytes/sec
total size is 15,42M  speedup is 1,00`}
                />
                <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400 list-disc pl-5">
                    <li>
                        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                            sending incremental file list
                        </code>{' '}
                        — rsync construit sa liste à la volée (mode incrémental, défaut depuis rsync
                        3.0).
                    </li>
                    <li>
                        Les lignes suivantes — chaque fichier transféré est affiché. Les dossiers se
                        terminent par <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/</code>.
                    </li>
                    <li>
                        <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                            speedup is 1,00
                        </code>{' '}
                        — ratio d'efficacité. Pour une copie initiale, tous les fichiers sont
                        transférés : speedup = 1,00 (aucune économie delta). Lors des synchros
                        suivantes, ce chiffre augmente.
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-2">
                    Deuxième exécution (aucun fichier modifié)
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`rsync -avh /home/user/documents/ /mnt/backup/documents/`}
                />
                <CodeBlock
                    title="Sortie terminal"
                    code={`sending incremental file list

sent 223 bytes  received 12 bytes  470,00 bytes/sec
total size is 15,42M  speedup is 65,99`}
                />
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Un <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">speedup</code> de{' '}
                    65,99 signifie que rsync n'a transféré que 1/66e de la taille totale des
                    fichiers — uniquement les métadonnées pour vérifier que tout est à jour. Aucun
                    contenu n'a été retransféré.
                </p>
            </div>

            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Synchronisation miroir (avec suppression)
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# WARNING: --delete supprime les fichiers dans /backup/ qui n'existent plus dans /source/
# TOUJOURS tester avec --dry-run d'abord !

# 1. Test à blanc
rsync -avhn --delete /home/user/projets/ /backup/projets/

# 2. Si le résultat est correct, exécuter pour de vrai
rsync -avh --delete /home/user/projets/ /backup/projets/`}
                />
            </div>

            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Copie avec barre de progression
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# -P = --partial + --progress
rsync -avhP /home/user/iso/ubuntu.iso /mnt/usb/

# Sortie :
# ubuntu.iso
#   2.85G  45%  125.50MB/s    0:00:12`}
                />
            </div>

            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Exclure des fichiers
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Exclure un pattern
rsync -avh --exclude='*.log' /var/www/ /backup/www/

# Exclure plusieurs patterns
rsync -avh \\
  --exclude='*.log' \\
  --exclude='node_modules' \\
  --exclude='.git' \\
  --exclude='__pycache__' \\
  /home/user/projet/ /backup/projet/

# Exclure depuis un fichier
rsync -avh --exclude-from='exclude-list.txt' /source/ /dest/`}
                />
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>
                        <Lightbulb size={16} className="inline mr-1" /> Bonne pratique :
                    </strong>{' '}
                    Utilisez toujours{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">-n</code>{' '}
                    (dry-run) avant toute commande rsync impliquant{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">--delete</code>.
                    Cela vous montre exactement ce qui sera modifié sans toucher aux fichiers.
                </p>
            </div>
        </div>
    );
};
