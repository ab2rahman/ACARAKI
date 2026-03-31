"use client";

import { useState } from 'react';
import { login, register, forgotPassword } from '@/utils/auth';
import './member.scss';

const LoginRegister = ({ onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Forgot password state
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState('');
    const [forgotErrors, setForgotErrors] = useState({});
    
    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    // Registration form state
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        password: '',
        confirm_password: ''
    });

    // Handle input changes for login
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle input changes for registration
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Validate login form
    const validateLogin = () => {
        const newErrors = {};
        
        if (!loginData.email) {
            newErrors.email = 'Email harus diisi';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Email tidak valid';
        }
        
        if (!loginData.password) {
            newErrors.password = 'Kata sandi harus diisi';
        }
        
        return newErrors;
    };

    // Validate registration form
    const validateRegister = () => {
        const newErrors = {};
        
        if (!registerData.name) {
            newErrors.name = 'Nama lengkap harus diisi';
        }
        
        if (!registerData.email) {
            newErrors.email = 'Email harus diisi';
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = 'Email tidak valid';
        }
        
        if (!registerData.phone) {
            newErrors.phone = 'Nomor handphone harus diisi';
        } else if (!/^\d+$/.test(registerData.phone)) { //number only
            newErrors.phone = 'Nomor handphone tidak valid';
        }
        
        if (!registerData.age) {
            newErrors.age = 'Umur harus diisi';
        } else if (parseInt(registerData.age) < 13 || parseInt(registerData.age) > 120) {
            newErrors.age = 'Umur harus antara 13 dan 120';
        }
        
        if (!registerData.gender) {
            newErrors.gender = 'Jenis kelamin harus diisi';
        }
        
        if (!registerData.password) {
            newErrors.password = 'Kata sandi harus diisi';
        } else if (registerData.password.length < 8) {
            newErrors.password = 'Kata sandi harus minimal 8 karakter';
        }
        
        if (!registerData.confirm_password) {
            newErrors.confirm_password = 'Konfirmasi kata sandi harus diisi';
        } else if (registerData.password !== registerData.confirm_password) {
            newErrors.confirm_password = 'Kata sandi tidak cocok';
        }
        
        return newErrors;
    };

    // Handle login submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');
        
        const validationErrors = validateLogin();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);
        
        try {
            const result = await login(loginData.email, loginData.password);

            if (result.success) {
                setSuccess('Login successful! Redirecting...');
                onLoginSuccess(result.data.access_token, result.data.user);
            } else {
                setErrors({ general: result.error });
                if (result.errors) {
                    setErrors(prev => ({ ...prev, ...result.errors }));
                }
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Handle registration submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');
        
        const validationErrors = validateRegister();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);
        
        try {
            const result = await register(registerData);
            
            if (result.success) {
                setSuccess('Registration successful! You can now login.');
                // Clear form
                setRegisterData({
                    name: '',
                    email: '',
                    phone: '',
                    age: '',
                    gender: '',
                    password: '',
                    confirm_password: ''
                });
                // Switch to login mode
                setTimeout(() => setIsLoginMode(true), 2000);
            } else {
                setErrors({ general: result.error });
                if (result.errors) {
                    setErrors(prev => ({ ...prev, ...result.errors }));
                }
            }
        } catch (error) {
            setErrors({ general: 'An unexpected error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Switch between login and register modes
    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setErrors({});
        setSuccess('');
    };

    // Handle forgot password
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotErrors({});
        setForgotSuccess('');

        // Validate email
        if (!forgotEmail) {
            setForgotErrors({ email: 'Email harus diisi' });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
            setForgotErrors({ email: 'Email tidak valid' });
            return;
        }

        setForgotLoading(true);

        try {
            const result = await forgotPassword(forgotEmail);

            if (result.success) {
                setForgotSuccess('Link reset password telah dikirim ke email Anda.');
                setForgotEmail('');
            } else {
                setForgotErrors({ general: result.error });
                if (result.errors) {
                    setForgotErrors(result.errors);
                }
            }
        } catch (error) {
            setForgotErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
        } finally {
            setForgotLoading(false);
        }
    };

    const closeForgotPassword = () => {
        setShowForgotPassword(false);
        setForgotEmail('');
        setForgotErrors({});
        setForgotSuccess('');
    };

    return (
        <div className="member-auth-container">
            <div className="member-auth-card">
                {/* Header */}
                <div className="member-auth-header">
                    <h1 className="member-auth-title">
                        {isLoginMode ? 'Selamat Datang' : 'Pendaftaran'}
                    </h1>
                    <p className="member-auth-subtitle">
                        {isLoginMode 
                            ? 'Masuk ke akun Anda untuk melanjutkan' 
                            : 'Daftar untuk memulai'
                        }
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div className="member-auth-toggle">
                    <button
                        type="button"
                        className={`member-auth-toggle-btn ${isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(true)}
                    >
                        Masuk
                    </button>
                    <button
                        type="button"
                        className={`member-auth-toggle-btn ${!isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(false)}
                    >
                        Daftar
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="member-auth-success">
                        {success}
                    </div>
                )}

                {/* General Error */}
                {errors.general && (
                    <div className="member-auth-error">
                        {errors.general}
                    </div>
                )}

                {/* Login Form */}
                {isLoginMode ? (
                    <form onSubmit={handleLoginSubmit} className="member-auth-form">
                        <div className="member-form-group">
                            <label htmlFor="email" className="member-form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className={`member-form-input ${errors.email ? 'error' : ''}`}
                                placeholder="Masukkan email Anda"
                                disabled={loading}
                            />
                            {errors.email && (
                                <span className="member-form-error">{errors.email}</span>
                            )}
                        </div>

                        <div className="member-form-group">
                            <label htmlFor="password" className="member-form-label">
                                Kata Sandi
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className={`member-form-input ${errors.password ? 'error' : ''}`}
                                placeholder="Masukkan kata sandi Anda"
                                disabled={loading}
                            />
                            {errors.password && (
                                <span className="member-form-error">{errors.password}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="member-form-submit"
                            disabled={loading}
                        >
                            {loading ? 'Masuk...' : 'Masuk'}
                        </button>

                        {/* Forgot Password Link */}
                        <div className="member-forgot-password">
                            <button
                                type="button"
                                className="member-auth-link"
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Lupa Password?
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Registration Form */
                    <form onSubmit={handleRegisterSubmit} className="member-auth-form">
                        <div className="member-form-row">
                            <div className="member-form-group">
                                <label htmlFor="name" className="member-form-label">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="Masukkan nama lengkap Anda"
                                    disabled={loading}
                                />
                                {errors.name && (
                                    <span className="member-form-error">{errors.name}</span>
                                )}
                            </div>

                            <div className="member-form-group">
                                <label htmlFor="email" className="member-form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="Masukkan email Anda"
                                    disabled={loading}
                                />
                                {errors.email && (
                                    <span className="member-form-error">{errors.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="member-form-row">
                            <div className="member-form-group">
                                <label htmlFor="phone" className="member-form-label">
                                    Nomor Handphone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.phone ? 'error' : ''}`}
                                    placeholder="Masukkan nomor handphone Anda"
                                    disabled={loading}
                                />
                                {errors.phone && (
                                    <span className="member-form-error">{errors.phone}</span>
                                )}
                            </div>

                            <div className="member-form-group">
                                <label htmlFor="age" className="member-form-label">
                                    Umur
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    min="13"
                                    max="120"
                                    value={registerData.age}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.age ? 'error' : ''}`}
                                    placeholder="Masukkan umur Anda"
                                    disabled={loading}
                                />
                                {errors.age && (
                                    <span className="member-form-error">{errors.age}</span>
                                )}
                            </div>
                        </div>

                        <div className="member-form-group">
                            <label htmlFor="gender" className="member-form-label">
                                Jenis Kelamin
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={registerData.gender}
                                onChange={handleRegisterChange}
                                className={`member-form-input ${errors.gender ? 'error' : ''}`}
                                disabled={loading}
                            >
                                <option value="">Pilih jenis kelamin Anda</option>
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                            {errors.gender && (
                                <span className="member-form-error">{errors.gender}</span>
                            )}
                        </div>

                        <div className="member-form-row">
                            <div className="member-form-group">
                                <label htmlFor="password" className="member-form-label">
                                    Kata Sandi
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Buat kata sandi Anda"
                                    disabled={loading}
                                />
                                {errors.password && (
                                    <span className="member-form-error">{errors.password}</span>
                                )}
                            </div>

                            <div className="member-form-group">
                                <label htmlFor="confirm_password" className="member-form-label">
                                    Konfirmasi Kata Sandi
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={registerData.confirm_password}
                                    onChange={handleRegisterChange}
                                    className={`member-form-input ${errors.confirm_password ? 'error' : ''}`}
                                    placeholder="Konfirmasi kata sandi Anda"
                                    disabled={loading}
                                />
                                {errors.confirm_password && (
                                    <span className="member-form-error">{errors.confirm_password}</span>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="member-form-submit"
                            disabled={loading}
                        >
                            {loading ? 'Membuat akun...' : 'Buat Akun'}
                        </button>
                    </form>
                )}

                {/* Footer */}
                <div className="member-auth-footer">
                    <p>
                        {isLoginMode ? "Belum punya akun? " : "Sudah punya akun? "}
                        <button
                            type="button"
                            className="member-auth-link"
                            onClick={toggleMode}
                        >
                            {isLoginMode ? 'Daftar di sini' : 'Masuk di sini'}
                        </button>
                    </p>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="member-modal-overlay" onClick={closeForgotPassword}>
                    <div className="member-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="member-modal-header">
                            <h2 className="member-modal-title">Lupa Password?</h2>
                            <button
                                type="button"
                                className="member-modal-close"
                                onClick={closeForgotPassword}
                            >
                                ×
                            </button>
                        </div>

                        <p className="member-modal-subtitle">
                            Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
                        </p>

                        {forgotSuccess && (
                            <div className="member-auth-success">
                                {forgotSuccess}
                            </div>
                        )}

                        {forgotErrors.general && (
                            <div className="member-auth-error">
                                {forgotErrors.general}
                            </div>
                        )}

                        <form onSubmit={handleForgotPassword} className="member-form">
                            <div className="member-form-group">
                                <label htmlFor="forgot_email" className="member-form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="forgot_email"
                                    value={forgotEmail}
                                    onChange={(e) => {
                                        setForgotEmail(e.target.value);
                                        if (forgotErrors.email) {
                                            setForgotErrors({});
                                        }
                                    }}
                                    className={`member-form-input ${forgotErrors.email ? 'error' : ''}`}
                                    placeholder="Masukkan email Anda"
                                    disabled={forgotLoading}
                                />
                                {forgotErrors.email && (
                                    <span className="member-form-error">{forgotErrors.email}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="member-form-submit"
                                disabled={forgotLoading}
                            >
                                {forgotLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                            </button>
                        </form>

                        <div className="member-modal-footer">
                            <button
                                type="button"
                                className="member-auth-link"
                                onClick={closeForgotPassword}
                            >
                                Kembali ke Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
