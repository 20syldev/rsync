import { CodeBlock } from '../CodeBlock';
import { Lock, Lightbulb, Network, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const RemoteSection = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Transferts distants
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Rsync supporte deux modes de transfert distant : via SSH (par défaut) et via le
                    daemon rsync. Chaque méthode a ses avantages.
                </p>
            </div>

            {/* Mode SSH */}
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    <Lock size={20} className="inline mr-2" /> Mode SSH (par défaut)
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Le mode par défaut et le plus sécurisé. Le transport est chiffré via SSH, aucune
                    configuration serveur spécifique n'est nécessaire — il suffit d'un accès SSH.
                </p>

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-4">
                    Push — Envoyer des fichiers vers un serveur
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Envoyer un dossier vers un serveur distant
rsync -avhP /home/user/projet/ user@serveur.com:/var/www/projet/

# Avec un port SSH personnalisé
rsync -avhP -e "ssh -p 2222" /home/user/projet/ user@serveur.com:/var/www/projet/

# Avec une clé SSH spécifique
rsync -avhP -e "ssh -i ~/.ssh/id_deploy" /home/user/projet/ user@serveur.com:/var/www/projet/`}
                />
                <CodeBlock
                    title="Sortie terminal (avec -P)"
                    code={`sending incremental file list
index.html
         8,42K 100%    0,00kB/s    0:00:00 (xfr#1, to-chk=42/44)
app.js
     1,23M  67%  456,12kB/s    0:00:01
     1,84M 100%  523,44kB/s    0:00:03 (xfr#2, to-chk=41/44)
assets/logo.png
       124,5K 100%  412,33kB/s    0:00:00 (xfr#3, to-chk=40/44)

sent 3,21M bytes  received 2,14K bytes  654,22kB/s
total size is 12,45M  speedup is 3,87`}
                />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2">
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                        to-chk=40/44
                    </code>{' '}
                    — 40 fichiers restants à vérifier sur 44 au total.{' '}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">xfr#3</code> — 3e
                    fichier effectivement transféré (les autres étaient déjà à jour).{' '}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">speedup is 3,87</code>{' '}
                    — les fichiers inchangés ont évité 3× leur taille en transfert réseau.
                </p>

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Pull — Récupérer des fichiers depuis un serveur
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Récupérer un dossier depuis un serveur distant
rsync -avhP user@serveur.com:/var/log/app/ /local/logs/

# Récupérer un fichier unique
rsync -avhP user@serveur.com:/backup/db-dump.sql.gz /local/backups/`}
                />
            </div>

            {/* Clés SSH */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Configuration des clés SSH
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Pour automatiser les transferts (cron, scripts), configurez l'authentification
                    par clé SSH afin d'éviter la saisie du mot de passe.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# 1. Générer une paire de clés (si pas déjà fait)
ssh-keygen -t ed25519 -C "rsync-backup" -f ~/.ssh/id_rsync

# 2. Copier la clé publique sur le serveur distant
ssh-copy-id -i ~/.ssh/id_rsync.pub user@serveur.com

# 3. Tester la connexion sans mot de passe
ssh -i ~/.ssh/id_rsync user@serveur.com echo "OK"

# 4. Utiliser cette clé avec rsync
rsync -avhP -e "ssh -i ~/.ssh/id_rsync" /source/ user@serveur.com:/dest/`}
                />
                <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10 mt-3">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>
                            <Lightbulb size={16} className="inline mr-1" /> Conseil sécurité :
                        </strong>{' '}
                        Pour les sauvegardes automatiques, créez un utilisateur dédié sur le serveur
                        avec des permissions restreintes. Vous pouvez limiter la clé SSH à rsync
                        uniquement dans{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            ~/.ssh/authorized_keys
                        </code>{' '}
                        avec un préfixe{' '}
                        <code className="bg-blue-100 dark:bg-blue-800/30 px-1 rounded">
                            command="..."
                        </code>
                        .
                    </p>
                </div>
            </div>

            {/* Restreindre la clé SSH */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Restreindre une clé SSH à rsync
                </h3>
                <CodeBlock
                    title="~/.ssh/authorized_keys (sur le serveur)"
                    code={`# Limiter cette clé à rsync uniquement
command="rsync --server --sender -vlHogDtpre.iLsfxCIvu . /backup/",no-pty,no-agent-forwarding,no-port-forwarding ssh-ed25519 AAAAC3... rsync-backup`}
                />
            </div>

            {/* Mode Daemon */}
            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm mt-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                    <Network size={20} className="inline mr-2" /> Mode Daemon rsync
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Le mode daemon tourne en service permanent sur le port 873/TCP. Il ne chiffre
                    pas les données (sauf via un tunnel SSH) mais offre un contrôle fin des modules
                    partagés, une authentification par fichier secrets, et ne nécessite pas de
                    compte SSH.
                </p>

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Configuration du serveur daemon
                </h4>
                <CodeBlock
                    title="/etc/rsyncd.conf"
                    code={`# Configuration globale
uid = nobody
gid = nogroup
use chroot = yes
max connections = 10
log file = /var/log/rsyncd.log
pid file = /var/run/rsyncd.pid

# Module "backup" — accessible en lecture/écriture
[backup]
    path = /srv/backup
    comment = Espace de sauvegarde
    read only = no
    auth users = backupuser
    secrets file = /etc/rsyncd.secrets
    hosts allow = 192.168.1.0/24
    hosts deny = *

# Module "public" — accessible en lecture seule
[public]
    path = /srv/public
    comment = Fichiers publics
    read only = yes
    list = yes`}
                />

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Fichier de mots de passe
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Créer le fichier secrets (format user:password)
echo "backupuser:MotDePasseSecret123" | sudo tee /etc/rsyncd.secrets

# Permissions strictes obligatoires
sudo chmod 600 /etc/rsyncd.secrets`}
                />

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Démarrer le daemon
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Via systemd (recommandé)
sudo systemctl enable --now rsync   # Debian/Ubuntu
sudo systemctl enable --now rsyncd  # RHEL/CentOS

# Ou manuellement
rsync --daemon --config=/etc/rsyncd.conf

# Vérifier que le daemon écoute
ss -tlnp | grep 873`}
                />

                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Utiliser le daemon (côté client)
                </h4>
                <CodeBlock
                    title="Terminal"
                    code={`# Syntaxe avec double-colon (::)
rsync -avhP /data/ backupuser@serveur::backup/

# Syntaxe URL (rsync://)
rsync -avhP /data/ rsync://backupuser@serveur/backup/

# Lister les modules disponibles sur un serveur
rsync rsync://serveur/

# Avec fichier de mot de passe (pour automatisation)
echo "MotDePasseSecret123" > ~/.rsync-password
chmod 600 ~/.rsync-password
rsync -avhP --password-file=~/.rsync-password /data/ backupuser@serveur::backup/`}
                />
            </div>

            {/* Tunnel SSH vers daemon */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Tunnel SSH vers un daemon rsync (chiffrement du mode daemon)
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Pour utiliser le mode daemon (port 873) avec chiffrement, créez un tunnel SSH
                    qui redirige un port local vers le port 873 du serveur. Toutes les données
                    transitent alors par SSH.
                </p>
                <CodeBlock
                    title="Terminal"
                    code={`# 1. Créer le tunnel SSH en arrière-plan
ssh -f -N -L 8873:localhost:873 user@serveur.com

# 2. Synchroniser via le tunnel (utiliser localhost avec le port redirigé)
rsync -avhP --port=8873 /data/ rsync://backupuser@localhost/backup/

# Ou en une seule commande (tunnel intégré à rsync)
rsync -avhP \\
  -e "ssh -L 8873:localhost:873 -o ExitOnForwardFailure=yes" \\
  /data/ rsync://backupuser@localhost/backup/

# Fermer le tunnel après usage
pkill -f "ssh -f -N -L 8873"`}
                />
                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mt-3">
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>
                            <AlertTriangle size={16} className="inline mr-1" /> Cas d'usage
                            spécifique :
                        </strong>{' '}
                        Cette technique est utile uniquement si vous avez besoin des fonctionnalités
                        du mode daemon (modules, authentification par secrets) sur un réseau non
                        sécurisé. Dans la grande majorité des cas, le{' '}
                        <strong>mode SSH natif est plus simple et tout aussi sécurisé</strong>.
                    </p>
                </div>
            </div>

            {/* Comparaison SSH vs Daemon */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                    SSH vs Daemon : lequel choisir ?
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Critère
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    SSH
                                </th>
                                <th className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                    Daemon
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-600 dark:text-zinc-400">
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-medium">Chiffrement</td>
                                <td className="py-3 px-4">
                                    <CheckCircle size={16} className="inline mr-1" /> Natif (SSH)
                                </td>
                                <td className="py-3 px-4">
                                    <XCircle size={16} className="inline mr-1" /> Non (sauf tunnel
                                    SSH)
                                </td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-medium">Authentification</td>
                                <td className="py-3 px-4">Clé SSH / mot de passe SSH</td>
                                <td className="py-3 px-4">Fichier secrets dédié</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-medium">Compte système</td>
                                <td className="py-3 px-4">Nécessaire sur le serveur</td>
                                <td className="py-3 px-4">Pas nécessaire</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-medium">Performance</td>
                                <td className="py-3 px-4">Légèrement plus lent (chiffrement)</td>
                                <td className="py-3 px-4">Plus rapide (pas de chiffrement)</td>
                            </tr>
                            <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                                <td className="py-3 px-4 font-medium">Port</td>
                                <td className="py-3 px-4">22 (SSH)</td>
                                <td className="py-3 px-4">873 (rsync)</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 font-medium">Cas d'usage</td>
                                <td className="py-3 px-4">Internet, WAN, partout</td>
                                <td className="py-3 px-4">LAN, réseau de confiance</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Firewall */}
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2 mt-6">
                    Configuration du pare-feu
                </h3>
                <CodeBlock
                    title="Terminal"
                    code={`# Pour le mode daemon, ouvrir le port 873
sudo ufw allow 873/tcp                    # UFW (Ubuntu)
sudo firewall-cmd --add-port=873/tcp --permanent  # firewalld (RHEL)
sudo firewall-cmd --reload

# Pour le mode SSH, le port 22 est généralement déjà ouvert
sudo ufw allow ssh`}
                />
            </div>

            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 mt-6">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>
                        <AlertTriangle size={16} className="inline mr-1" /> Recommandation :
                    </strong>{' '}
                    Privilégiez le mode SSH pour les transferts sur Internet. Utilisez le mode
                    daemon uniquement sur un réseau local de confiance ou à travers un tunnel
                    SSH/VPN.
                </p>
            </div>
        </div>
    );
};
