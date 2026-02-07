import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RsyncDocs from './index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RsyncDocs />
    </StrictMode>
);
