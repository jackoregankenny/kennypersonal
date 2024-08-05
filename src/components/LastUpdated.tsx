import React from 'react';

const LastUpdatedFooter: React.FC = () => {
    // Use Netlify's build time environment variable
    const buildTime: string = process.env.REACT_APP_BUILD_TIME || new Date().toISOString();
    
    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });
    };

    return (
        <footer className="text-sm text-gray-600 mb-4 md:mb-0">
            <p>Last updated: {formatDate(buildTime)}</p>
        </footer>
    );
};

export default LastUpdatedFooter;