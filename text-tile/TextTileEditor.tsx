import Modal, { ModalButtons } from 'components/Modal';
import Button from 'components/button/Button';
import { TextTileConfig } from 'dashboard-engine/tiles/text';
import type { TextConfig } from 'dashboard-engine/visualisations/Text/Config';
import React, { useState } from 'react';
import { TextPreview } from './TextPreview';

/**
 * TextTileEditor - A component for editing text tile configuration
 *
 * This component allows users to:
 * - Edit the text content of a tile
 * - Control font size and alignment
 * - Preview changes in real-time
 */
export const TextTileEditor: React.FC<{
    config: TextTileConfig;
    onClose: () => void;
}> = ({ config, onClose }) => {
    const [content, setContent] = useState('');
    const [fontSize, setFontSize] = useState();
    const [align, setAlign] = useState<TextConfig['align']>('left');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        console.log('Setting default values');

        if (config.visualisation?.config) {
            setContent(config.visualisation?.config?.content || 'Sample text');
            setFontSize(config.visualisation?.config?.fontSize || 16);
            setAlign(config.visualisation?.config?.align || 'left');
        }
    }, []);

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const response = await fetch('/api/text-tile/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: config.id,
                    content,
                    fontSize,
                    align
                })
            });

            if (response.ok) {
                console.log('Saved successfully');
                onClose();
            } else {
                console.error('Save failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const renderTextArea = () => {
        return (
            <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Type some text here'
                    className='w-full h-32 p-3 border border-gray-300 rounded-md'
                />
            </div>
        );
    };

    return (
        <Modal title='Edit Text Tile' close={onClose} maxWidth='max-w-4xl'>
            <div className='flex min-h-[400px]'>
                {/* Left side - Form controls */}
                <div className='flex-1 p-6 border-r'>
                    <h2 className='mb-4 text-xl font-bold'>Edit text tile</h2>

                    {renderTextArea()}

                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-medium'>Font Size</label>
                        <input
                            type='range'
                            min='12'
                            max='48'
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className='w-full'
                        />
                        <div className='mt-1 text-sm text-gray-600'>{fontSize}px</div>
                    </div>

                    <div className='mb-6'>
                        <label className='block mb-2 text-sm font-medium'>Alignment</label>
                        <div className='flex space-x-2'>
                            {(['left', 'center', 'right'] as const).map((alignment) => (
                                <button
                                    type='button'
                                    onClick={() => setAlign(alignment)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        align === alignment ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {alignment}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ModalButtons>
                        <Button type='button' onClick={onClose} variant='tertiary'>
                            Cancel
                        </Button>
                        <Button type='button' onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </Button>
                    </ModalButtons>
                </div>

                {/* Right side - Preview */}
                <div className='flex items-center justify-center flex-1 p-4 bg-gray-50'>
                    <TextPreview textConfig={{ content, fontSize, align }} />
                </div>
            </div>
        </Modal>
    );
};
