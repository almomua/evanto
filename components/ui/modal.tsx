'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Modal Types
type ModalType = 'confirm' | 'alert' | 'success' | 'error' | 'info';

interface ModalConfig {
    type: ModalType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface ModalContextType {
    showModal: (config: ModalConfig) => void;
    confirm: (message: string, title?: string) => Promise<boolean>;
    alert: (message: string, title?: string, type?: 'success' | 'error' | 'info') => void;
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<ModalConfig | null>(null);
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

    const showModal = useCallback((modalConfig: ModalConfig) => {
        setConfig(modalConfig);
        setIsOpen(true);
    }, []);

    const confirm = useCallback((message: string, title = 'Confirm'): Promise<boolean> => {
        return new Promise((resolve) => {
            setResolvePromise(() => resolve);
            showModal({
                type: 'confirm',
                title,
                message,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            });
        });
    }, [showModal]);

    const alert = useCallback((message: string, title = 'Notice', type: 'success' | 'error' | 'info' = 'info') => {
        showModal({
            type,
            title,
            message,
            confirmText: 'OK',
        });
    }, [showModal]);

    const success = useCallback((message: string, title = 'Success') => {
        alert(message, title, 'success');
    }, [alert]);

    const error = useCallback((message: string, title = 'Error') => {
        alert(message, title, 'error');
    }, [alert]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (resolvePromise) {
            resolvePromise(false);
            setResolvePromise(null);
        }
        config?.onCancel?.();
    }, [resolvePromise, config]);

    const handleConfirm = useCallback(() => {
        setIsOpen(false);
        if (resolvePromise) {
            resolvePromise(true);
            setResolvePromise(null);
        }
        config?.onConfirm?.();
    }, [resolvePromise, config]);

    return (
        <ModalContext.Provider value={{ showModal, confirm, alert, success, error }}>
            {children}
            {isOpen && config && (
                <ModalOverlay onClose={handleClose}>
                    <ModalContent
                        config={config}
                        onConfirm={handleConfirm}
                        onClose={handleClose}
                    />
                </ModalOverlay>
            )}
        </ModalContext.Provider>
    );
}

// Modal Overlay
function ModalOverlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {children}
        </div>
    );
}

// Modal Content
function ModalContent({
    config,
    onConfirm,
    onClose
}: {
    config: ModalConfig;
    onConfirm: () => void;
    onClose: () => void;
}) {
    const getIcon = () => {
        switch (config.type) {
            case 'success':
                return <CheckCircle className="w-12 h-12 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-12 h-12 text-red-500" />;
            case 'confirm':
                return <AlertTriangle className="w-12 h-12 text-amber-500" />;
            case 'info':
            default:
                return <Info className="w-12 h-12 text-[#8A33FD]" />;
        }
    };

    const getConfirmButtonStyle = () => {
        switch (config.type) {
            case 'error':
                return 'bg-red-500 hover:bg-red-600';
            case 'success':
                return 'bg-green-500 hover:bg-green-600';
            case 'confirm':
                return 'bg-[#8A33FD] hover:bg-[#7928E8]';
            default:
                return 'bg-[#8A33FD] hover:bg-[#7928E8]';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[#3C4242]">{config.title}</h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* Body */}
            <div className="px-6 py-8 flex flex-col items-center text-center">
                <div className="mb-4">
                    {getIcon()}
                </div>
                <p className="text-[#3C4242] text-base leading-relaxed">
                    {config.message}
                </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-center gap-3">
                {config.type === 'confirm' && config.cancelText && (
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-gray-300 text-[#3C4242] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        {config.cancelText}
                    </button>
                )}
                <button
                    onClick={onConfirm}
                    className={`px-6 py-2.5 text-white rounded-lg font-medium transition-colors ${getConfirmButtonStyle()}`}
                >
                    {config.confirmText || 'OK'}
                </button>
            </div>
        </div>
    );
}

// Export a simple hook for components that just need confirm/alert
export { ModalContext };
