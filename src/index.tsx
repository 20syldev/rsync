import { useState, ReactNode } from 'react';
import { Book, Terminal, Settings, Server, Clock, Activity, Download } from 'lucide-react';
import { Layout } from './components/Layout';
import { IntroSection } from './components/sections/IntroSection';
import { InstallSection } from './components/sections/InstallSection';
import { BasicUsageSection } from './components/sections/BasicUsageSection';
import { AdvancedSection } from './components/sections/AdvancedSection';
import { RemoteSection } from './components/sections/RemoteSection';
import { AutomationSection } from './components/sections/AutomationSection';
import { TroubleshootSection } from './components/sections/TroubleshootSection';

interface NavigationItem {
    id: string;
    title: string;
    icon: ReactNode;
}

/**
 * Application Principale - Guide Rsync
 */
export default function RsyncDocs() {
    const [activeSection, setActiveSection] = useState('intro');

    // Données de navigation
    const navigation: NavigationItem[] = [
        { id: 'intro', title: 'Introduction', icon: <Book size={18} /> },
        { id: 'install', title: 'Installation', icon: <Download size={18} /> },
        { id: 'basic-usage', title: 'Utilisation de base', icon: <Terminal size={18} /> },
        { id: 'advanced', title: 'Options avancées', icon: <Settings size={18} /> },
        { id: 'remote', title: 'Transferts distants', icon: <Server size={18} /> },
        { id: 'automation', title: 'Automatisation', icon: <Clock size={18} /> },
        { id: 'troubleshoot', title: 'Troubleshooting', icon: <Activity size={18} /> },
    ];

    // Rendu du contenu en fonction de la section active
    const renderContent = () => {
        switch (activeSection) {
            case 'intro':
                return <IntroSection />;
            case 'install':
                return <InstallSection />;
            case 'basic-usage':
                return <BasicUsageSection />;
            case 'advanced':
                return <AdvancedSection />;
            case 'remote':
                return <RemoteSection />;
            case 'automation':
                return <AutomationSection />;
            case 'troubleshoot':
                return <TroubleshootSection />;
            default:
                return <div>Section en construction</div>;
        }
    };

    return (
        <Layout
            navigation={navigation}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
        >
            {renderContent()}
        </Layout>
    );
}
