import { CodeBlock } from '../CodeBlock';
import { Lightbulb } from 'lucide-react';

export const TroubleshootSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Troubleshooting
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Outils de diagnostic, erreurs courantes et techniques d'optimisation.
                </p>
            </div>

            {/* Dry-run */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Simuler avant d'exécuter
                </h4>
                <p className="text-sm text-zinc-500 mb-3">
                    Toujours commencer par un dry-run pour vérifier ce qui sera modifié.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# Dry-run avec affichage détaillé
rsync -avhn --delete /source/ /dest/

# Dry-run avec itemize-changes pour un résumé codé
rsync -avhin --delete /source/ /dest/

# Dry-run avec stats complètes
rsync -avhn --delete --stats /source/ /dest/`}
                />
            </div>

            {/* Niveaux de verbosité */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Niveaux de verbosité
                </h4>
                <div className="overflow-x-auto mt-3">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Option
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Détails affichés
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">-v</td>
                                <td className="py-2 px-4">Liste des fichiers transférés</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">-vv</td>
                                <td className="py-2 px-4">Fichiers ignorés et plus de détails</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">-vvv</td>
                                <td className="py-2 px-4">Informations de débogage du protocole</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">--progress</td>
                                <td className="py-2 px-4">Barre de progression par fichier</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">--stats</td>
                                <td className="py-2 px-4">
                                    Statistiques globales en fin de transfert
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono">-i</td>
                                <td className="py-2 px-4">
                                    Résumé codé de chaque changement (itemize)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Erreurs courantes */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    Erreurs courantes et solutions
                </h3>

                <div className="space-y-4">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 font-mono text-sm">
                            rsync: connection unexpectedly closed
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            La connexion SSH a été interrompue. Causes possibles :
                        </p>
                        <ul className="list-disc pl-6 text-sm text-zinc-600 dark:text-zinc-400 mt-1 space-y-1">
                            <li>Le serveur distant n'a pas rsync installé</li>
                            <li>Le chemin distant n'existe pas</li>
                            <li>Problème réseau ou timeout SSH</li>
                            <li>Le disque distant est plein</li>
                        </ul>
                        <CodeBlock
                            title="Diagnostic"
                            code={`# Vérifier la connexion SSH
ssh -vv user@serveur.com echo "OK"

# Vérifier que rsync est installé sur le serveur
ssh user@serveur.com "which rsync && rsync --version"`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 font-mono text-sm">
                            rsync error: some files/attrs were not transferred (code 23)
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            Certains fichiers n'ont pas pu être lus ou écrits.
                        </p>
                        <CodeBlock
                            title="Solutions"
                            code={`# Vérifier les permissions
ls -la /source/problematic-file

# Lancer avec sudo si nécessaire
sudo rsync -avh /source/ /dest/

# Ignorer les erreurs de permissions
rsync -avh --no-perms --no-owner --no-group /source/ /dest/`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 font-mono text-sm">
                            rsync error: some files vanished before they could be transferred (code
                            24)
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            Des fichiers ont été supprimés ou renommés pendant le transfert. C'est
                            généralement bénin (fichiers temporaires, logs en rotation).
                        </p>
                        <CodeBlock
                            title="Solution"
                            code={`# Ignorer cette erreur dans un script
rsync -avh /source/ /dest/
EXIT_CODE=$?
if [ $EXIT_CODE -eq 24 ]; then
    echo "Fichiers disparus pendant le transfert (normal)"
    exit 0
fi
exit $EXIT_CODE`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 font-mono text-sm">
                            failed to set times on "...": Operation not permitted
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            Le système de fichiers de destination ne supporte pas la modification
                            des timestamps (ex: FAT32, certains montages NFS/CIFS).
                        </p>
                        <CodeBlock
                            title="Solution"
                            code={`# Désactiver la préservation des timestamps
rsync -rlvh --no-times /source/ /dest/

# Ou ignorer les erreurs de timestamp
rsync -avh --modify-window=1 /source/ /dest/`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 font-mono text-sm">
                            @ERROR: auth failed on module
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                            Authentification échouée en mode daemon rsync.
                        </p>
                        <CodeBlock
                            title="Vérification"
                            code={`# Vérifier les permissions du fichier secrets
ls -la /etc/rsyncd.secrets
# Doit être -rw------- (chmod 600)

# Vérifier le contenu (format user:password)
cat /etc/rsyncd.secrets

# Vérifier que le module existe dans rsyncd.conf
grep -A5 '\\[backup\\]' /etc/rsyncd.conf`}
                        />
                    </div>
                </div>
            </div>

            {/* Debug SSH */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 mt-4">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Déboguer les connexions SSH
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Connexion SSH avec debug verbose
ssh -vv user@serveur.com

# Tester rsync avec le debug SSH activé
rsync -avhP -e "ssh -vv" /source/ user@serveur.com:/dest/

# Vérifier le fingerprint du serveur
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`}
                />
            </div>

            {/* Optimisation des performances */}
            <div className="mt-4">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    Optimisation des performances
                </h3>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Transfert en LAN (réseau local)
                        </h4>
                        <CodeBlock
                            title="Terminal"
                            code={`# En LAN, désactiver la compression (CPU > réseau)
rsync -avh --whole-file /source/ user@serveur:/dest/
# --whole-file désactive l'algorithme delta (plus rapide en LAN)`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Transfert sur WAN (Internet)
                        </h4>
                        <CodeBlock
                            title="Terminal"
                            code={`# Sur WAN, activer compression + limitation de bande passante
rsync -avhzP --bwlimit=5000 /source/ user@serveur:/dest/

# Avec zstd (rsync 3.2.3+) pour un meilleur ratio
rsync -avhP --compress-choice=zstd --bwlimit=5000 /source/ user@serveur:/dest/`}
                        />
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Beaucoup de petits fichiers
                        </h4>
                        <CodeBlock
                            title="Terminal"
                            code={`# Pour des millions de petits fichiers, désactiver les mises à jour incrémentielles
rsync -avh --no-inc-recursive /source/ /dest/

# Alternative : archiver d'abord, puis transférer
tar czf - /source/ | ssh user@serveur "tar xzf - -C /dest/"`}
                        />
                    </div>
                </div>
            </div>

            {/* Codes de sortie */}
            <div className="mt-4">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    Codes de sortie rsync
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Code
                                </th>
                                <th className="py-2 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Signification
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold text-green-600 dark:text-green-400">
                                    0
                                </td>
                                <td className="py-2 px-4">Succès</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">1</td>
                                <td className="py-2 px-4">Erreur de syntaxe ou d'utilisation</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">2</td>
                                <td className="py-2 px-4">Incompatibilité de protocole</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">3</td>
                                <td className="py-2 px-4">
                                    Erreurs de sélection de fichiers/dossiers
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">5</td>
                                <td className="py-2 px-4">
                                    Erreur de démarrage du protocole client-serveur
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">10</td>
                                <td className="py-2 px-4">Erreur I/O socket</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">11</td>
                                <td className="py-2 px-4">Erreur I/O fichier</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">12</td>
                                <td className="py-2 px-4">
                                    Erreur dans le flux de données du protocole
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">14</td>
                                <td className="py-2 px-4">Erreur IPC</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono">20</td>
                                <td className="py-2 px-4">Signal reçu (SIGUSR1, SIGINT)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                                    23
                                </td>
                                <td className="py-2 px-4">
                                    Transfert partiel — certains fichiers n'ont pas pu être
                                    transférés
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-2 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                                    24
                                </td>
                                <td className="py-2 px-4">
                                    Fichiers disparus pendant le transfert (souvent bénin)
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-mono">30</td>
                                <td className="py-2 px-4">Timeout en envoi/réception de données</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-6">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>
                        <Lightbulb size={16} className="inline mr-1" /> Pour aller plus loin :
                    </strong>{' '}
                    Consultez{' '}
                    <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">man rsync</code>{' '}
                    pour la documentation complète, ou visitez{' '}
                    <a
                        href="https://rsync.samba.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        rsync.samba.org
                    </a>{' '}
                    pour les dernières informations.
                </p>
            </div>
        </div>
    );
};
