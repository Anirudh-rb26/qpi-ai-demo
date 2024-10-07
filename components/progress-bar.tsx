import React from 'react'

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#E0E0E0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
                width: `${progress}%`,
                backgroundColor: progress === 100 ? '#4CAF50' : '#3B82F6',
                height: '20px',
                transition: 'width 0.5s ease'
            }}>
            </div>
        </div>
    )
}

export default ProgressBar