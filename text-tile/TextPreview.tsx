import React from 'react';
import { TextConfig } from 'dashboard-engine/visualisations/Text/Config';

interface TextPreviewProps {
    textConfig: TextConfig;
}

/**
 * TextPreview - Shows a preview of how the text will look
 * 
 * This component:
 * - Takes text configuration as props
 * - Displays the text with applied styling
 * - Shows font size and alignment settings
 */
export const TextPreview: React.FC<TextPreviewProps> = ({ textConfig }) => {
    const previewStyles = {
        fontSize: `${textConfig.fontSize}px`,
        textAlign: textConfig.align as 'left' | 'center' | 'right',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        minHeight: '200px',
        width: '100%',
        maxWidth: '350px'
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center p-4'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Preview</h3>
            
            <div style={previewStyles} className='preview-container'>
                <div className='whitespace-pre-wrap'>
                    {textConfig.content || 'No content'}
                </div>
                
                <div className='mt-4 pt-4 border-t border-gray-300 text-xs text-gray-500'>
                    <p>Font Size: {textConfig.fontSize}px</p>
                    <p>Alignment: {textConfig.align}</p>
                    <p>Characters: {(textConfig.content || '').length}</p>
                </div>
            </div>
        </div>
    );
};