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

    return (
        <Modal title='Edit Text Tile' close={onClose} maxWidth='max-w-4xl'>
            <div className='flex min-h-[400px]'>
                {/* Left side - Form controls */}
                <div className='flex-1 p-6 border-r'>
                    <h2 className='mb-4 text-xl font-bold'>Edit text tile</h2>

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
                        <Button type='button' onClick={() => onClose()}>
                            Save
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
