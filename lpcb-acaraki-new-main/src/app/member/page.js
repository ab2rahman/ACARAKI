"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginRegister from '@/components/Member/LoginRegister';
import MemberDetails from '@/components/Member/MemberDetails';
import { checkAuthToken, refreshAuthToken } from '@/utils/auth';

// Component that uses useSearchParams - needs to be wrapped in Suspense
function MemberPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [memberData, setMemberData] = useState(null);

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token && token !== 'undefined') {
                    // Verify token with API
                    const isValid = await checkAuthToken(token);
                    if (isValid) {
                        setIsLoggedIn(true);
                        // Don't automatically refresh token if it's already valid
                        // Token refresh will be handled by the axios interceptor when needed
                    } else {
                        // Token is invalid, try to refresh it
                        localStorage.removeItem('authToken');
                        setIsLoggedIn(false);
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                localStorage.removeItem('authToken');
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Handle successful login
    const handleLoginSuccess = (token, userData) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        setMemberData(userData);
        
        // Check for redirect parameter
        const redirectUrl = searchParams.get('redirect');
        if (redirectUrl) {
            // Redirect to the original URL after successful login
            router.push(redirectUrl);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setMemberData(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FCA311]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="container py-32">
                {!isLoggedIn ? (
                    <LoginRegister onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <MemberDetails 
                        memberData={memberData} 
                        setMemberData={setMemberData}
                        onLogout={handleLogout} 
                    />
                )}
            </div>
        </div>
    );
}

// Loading fallback component
function MemberPageLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FCA311]"></div>
        </div>
    );
}

// Main page component with Suspense boundary
export default function MemberPage() {
    return (
        <Suspense fallback={<MemberPageLoading />}>
            <MemberPageContent />
        </Suspense>
    );
}
