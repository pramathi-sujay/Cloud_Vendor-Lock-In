import React, { createContext, useContext, useState, useCallback } from 'react';

const AppStateContext = createContext();

const INITIAL_DEPLOYMENTS = [
    { id: 'dep-f3a1b2c4', provider: 'aws', container_image: 'nginx:latest', region: 'us-east-1', status: 'running', instanceType: 't3.medium', envVars: '', timestamp: Date.now() - 32000 },
    { id: 'dep-g8h7i6j5', provider: 'gcp', container_image: 'node:18-alpine', region: 'us-central1', status: 'running', instanceType: 'e2-medium', envVars: '', timestamp: Date.now() - 115000 },
    { id: 'dep-a2b3c4d5', provider: 'azure', container_image: 'nginx:latest', region: 'eastus', status: 'running', instanceType: 'B2s', envVars: '', timestamp: Date.now() - 180000 },
    { id: 'dep-o9p8q7r6', provider: 'aws', container_image: 'python:3.11-slim', region: 'eu-west-1', status: 'running', instanceType: 't3.small', envVars: '', timestamp: Date.now() - 270000 },
    { id: 'dep-w1x2y3z4', provider: 'gcp', container_image: 'redis:7-alpine', region: 'europe-west1', status: 'failed', instanceType: 'e2-small', envVars: '', timestamp: Date.now() - 430000 },
    { id: 'dep-e9f8g7h6', provider: 'aws', container_image: 'ubuntu:22.04', region: 'ap-southeast-1', status: 'running', instanceType: 't3.micro', envVars: '', timestamp: Date.now() - 720000 },
    { id: 'dep-m1n2o3p4', provider: 'gcp', container_image: 'postgres:15-alpine', region: 'asia-east1', status: 'running', instanceType: 'e2-medium', envVars: '', timestamp: Date.now() - 1200000 },
];

const INITIAL_MIGRATIONS = [
    { id: 'mig-001', source: 'GCP', target: 'AWS', status: 'completed', date: '2026-02-25', services: ['Cloud Storage', 'Firestore'], linesChanged: 14 },
];

let nextDepId = 200;

export const AppStateProvider = ({ children }) => {
    const [deployments, setDeployments] = useState(INITIAL_DEPLOYMENTS);
    const [migrations, setMigrations] = useState(INITIAL_MIGRATIONS);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        const s = localStorage.getItem('skyport-sidebar');
        return s === 'collapsed';
    });

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('skyport-sidebar', next ? 'collapsed' : 'expanded');
            return next;
        });
    }, []);

    const expandSidebar = useCallback(() => {
        setSidebarCollapsed(false);
        localStorage.setItem('skyport-sidebar', 'expanded');
    }, []);

    const addDeployment = useCallback((dep) => {
        const id = `dep-${Date.now().toString(36)}`;
        const newDep = { ...dep, id, timestamp: Date.now(), status: 'deploying' };
        setDeployments(prev => [newDep, ...prev]);
        return id;
    }, []);

    const updateDeploymentStatus = useCallback((id, status) => {
        setDeployments(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    }, []);

    const addMigration = useCallback((mig) => {
        setMigrations(prev => [mig, ...prev]);
    }, []);

    return (
        <AppStateContext.Provider value={{
            deployments, setDeployments,
            migrations, addMigration,
            sidebarCollapsed, toggleSidebar, expandSidebar,
            addDeployment, updateDeploymentStatus,
        }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);
