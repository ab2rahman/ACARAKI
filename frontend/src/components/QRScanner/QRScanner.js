"use client";

import { useState, useEffect } from 'react';
import Reader from 'react-qr-scanner';
import { useRouter } from 'next/navigation';
import './qr-scanner.scss';

const QRScanner = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [hasCamera, setHasCamera] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token && token !== 'undefined');
    }, []);

    const handleScan = (result) => {
        if (result) {
            // Close the scanner
            setIsOpen(false);

            // Extract QR code from result
            const qrCode = result.trim();

            // Redirect to check-in page
            router.push(`/check-in/${qrCode}`);
        }
    };

    const handleError = (err) => {
        console.error('QR Scanner error:', err);
        setError('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.');
        setHasCamera(false);
    };

    const toggleScanner = () => {
        // Check authentication before opening scanner
        const token = localStorage.getItem('authToken');
        if (!token || token === 'undefined') {
            // Redirect to login page
            router.push('/member');
            return;
        }

        if (!isOpen) {
            setError(null);
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating QR Button - Only visible on mobile and when authenticated */}
            {isAuthenticated && (
                <button
                    className="qr-fab"
                    onClick={toggleScanner}
                    aria-label="Scan QR Code"
                >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <rect x="7" y="7" width="10" height="10" rx="1" />
                </svg>
                </button>
            )}

            {/* Scanner Modal */}
            {isOpen && (
                <div className="qr-modal-overlay" onClick={toggleScanner}>
                    <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="qr-modal-header">
                            <h2>Scan QR Code</h2>
                            <button
                                className="qr-close-btn"
                                onClick={toggleScanner}
                                aria-label="Close"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M18 6L6 18" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Scanner Area */}
                        <div className="qr-scanner-area">
                            {error ? (
                                <div className="qr-error-message">
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 8v4" />
                                        <path d="M12 16h.01" />
                                    </svg>
                                    <p>{error}</p>
                                    <button
                                        className="qr-retry-btn"
                                        onClick={() => {
                                            setError(null);
                                            setHasCamera(true);
                                        }}
                                    >
                                        Coba Lagi
                                    </button>
                                </div>
                            ) : hasCamera ? (
                                <>
                                    <div className="qr-scanner-video">
                                        <Reader
                                            onScan={handleScan}
                                            onError={handleError}
                                            constraints={{
                                                audio: false,
                                                video: {
                                                    facingMode: 'environment'
                                                }
                                            }}
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </div>
                                    <div className="qr-scan-guide">
                                        <div className="qr-scan-frame"></div>
                                        <p>Arahkan kamera ke QR Code</p>
                                    </div>
                                </>
                            ) : (
                                <div className="qr-error-message">
                                    <p>Kamera tidak tersedia</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="qr-modal-footer">
                            <p>Scan QR code untuk check-in dan dapatkan poin!</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QRScanner;
