"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { checkAuthToken, checkInWithQRCode } from '@/utils/auth';

export default function CheckInPage() {
    const router = useRouter();
    const params = useParams();
    const { qrcode } = params;
    
    const [loading, setLoading] = useState(true);
    const [checkingIn, setCheckingIn] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCheckIn = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    // Redirect to member page with return URL
                    const currentUrl = `/check-in/${qrcode}`;
                    router.push(`/member?redirect=${encodeURIComponent(currentUrl)}`);
                    return;
                }

                // Verify token is still valid
                const isValidToken = await checkAuthToken(token);
                if (!isValidToken) {
                    localStorage.removeItem('authToken');
                    const currentUrl = `/check-in/${qrcode}`;
                    router.push(`/member?redirect=${encodeURIComponent(currentUrl)}`);
                    return;
                }

                // Proceed with check-in
                setLoading(false);
                setCheckingIn(true);

                const checkInResult = await checkInWithQRCode(qrcode);

                if (checkInResult.success) {
                    setResult({
                        success: true,
                        message: checkInResult.data.message || 'Check-in berhasil!',
                        data: checkInResult.data
                    });
                } else {
                    setResult({
                        success: false,
                        message: checkInResult.error || 'Check-in gagal'
                    });
                }

            } catch (err) {
                console.error('Check-in error:', err);
                setError('Terjadi kesalahan. Silakan coba lagi.');
            } finally {
                setLoading(false);
                setCheckingIn(false);
            }
        };

        if (qrcode) {
            handleCheckIn();
        }
    }, [qrcode, router]);

    const handleBackToMember = () => {
        router.push('/member');
    };

    const handleRetry = () => {
        setError(null);
        setResult(null);
        setLoading(true);
        
        // Re-trigger the check-in process
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FCA311] mx-auto mb-4"></div>
                    <h2 className="text-white text-xl font-semibold mb-2">
                        {checkingIn ? 'Sedang memproses check-in...' : 'Memverifikasi autentikasi...'}
                    </h2>
                    <p className="text-gray-300">
                        Silakan tunggu sampai kami memproses permintaan Anda.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
                {/* QR Code Info */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">Check-in</h1>
                </div>

                {/* Success Result */}
                {result && result.success && (
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-green-400 mb-2">Check-in berhasil</h2>
                        <p className="text-gray-300 mb-4">
                            {result.message}
                        </p>

                        {result.data && result.data.event && (
                            <div className="bg-white/5 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold">Event:</span> {result.data.event.name}
                                </p>
                                {result.data.event.date && (
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold">Date:</span> {new Date(result.data.event.date).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Error Result */}
                {(error || (result && !result.success)) && (
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-red-400 mb-2">Check-in gagal</h2>
                        <p className="text-gray-300 mb-4">
                            {error || (result && result.message) || 'An unexpected error occurred.'}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleBackToMember}
                        className="w-full bg-[#FCA311] hover:bg-[#FCA311]/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Kembali ke Area Member
                    </button>
                    
                    {error && (
                        <button
                            onClick={handleRetry}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg border border-white/20 transition-colors duration-200"
                        >
                            Coba Lagi
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
