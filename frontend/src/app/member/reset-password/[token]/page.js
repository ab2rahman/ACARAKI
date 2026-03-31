"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resetPassword } from '@/utils/auth';
import Link from 'next/link';
import '@/components/Member/member.scss';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        token: searchParams.get('token') || '',
        email: searchParams.get('email') || '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
            setErrors({ general: 'Link reset password tidak valid. Silakan request ulang.' });
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validate
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email harus diisi';
        }
        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password harus minimal 8 karakter';
        }
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password harus diisi';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const result = await resetPassword({
                token: formData.token,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            });

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/member');
                }, 3000);
            } else {
                setErrors({ general: result.error });
                if (result.errors) {
                    setErrors(result.errors);
                }
            }
        } catch (error) {
            setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="member-auth-container">
                <div className="member-auth-card">
                    <div className="member-auth-header">
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="member-auth-title">Password Berhasil Direset!</h1>
                    </div>
                    <div className="member-auth-form text-center">
                        <p className="text-gray-300 mb-6">
                            Password Anda telah berhasil direset. Anda akan dialihkan ke halaman login dalam beberapa saat...
                        </p>
                        <Link href="/member" className="member-form-submit inline-block">
                            Login Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="member-auth-container">
            <div className="member-auth-card">
                <div className="member-auth-header">
                    <h1 className="member-auth-title">Reset Password</h1>
                    <p className="member-auth-subtitle">
                        Masukkan password baru Anda
                    </p>
                </div>

                {errors.general && (
                    <div className="member-auth-error">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="member-auth-form">
                    <div className="member-form-group">
                        <label htmlFor="email" className="member-form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`member-form-input ${errors.email ? 'error' : ''}`}
                            placeholder="Email Anda"
                            disabled={loading}
                        />
                        {errors.email && (
                            <span className="member-form-error">{errors.email}</span>
                        )}
                    </div>

                    <div className="member-form-group">
                        <label htmlFor="password" className="member-form-label">
                            Password Baru
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`member-form-input ${errors.password ? 'error' : ''}`}
                            placeholder="Password baru (min. 8 karakter)"
                            disabled={loading}
                        />
                        {errors.password && (
                            <span className="member-form-error">{errors.password}</span>
                        )}
                    </div>

                    <div className="member-form-group">
                        <label htmlFor="password_confirmation" className="member-form-label">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            className={`member-form-input ${errors.password_confirmation ? 'error' : ''}`}
                            placeholder="Ulangi password baru"
                            disabled={loading}
                        />
                        {errors.password_confirmation && (
                            <span className="member-form-error">{errors.password_confirmation}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="member-form-submit"
                        disabled={loading}
                    >
                        {loading ? 'Memproses...' : 'Reset Password'}
                    </button>
                </form>

                <div className="member-auth-footer">
                    <p>
                        Ingat password Anda?{' '}
                        <Link href="/member" className="member-auth-link">
                            Login di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="member-auth-container">
                <div className="member-loading-spinner"></div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
