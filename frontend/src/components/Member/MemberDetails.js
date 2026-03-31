"use client";

import { useState, useEffect } from 'react';
import { getMemberProfile, getMemberEventHistory, logout, changePassword } from '@/utils/auth';
import './member.scss';

const MemberDetails = ({ memberData, setMemberData, onLogout }) => {
    const [loading, setLoading] = useState(false);
    const [eventHistory, setEventHistory] = useState([]);
    const [eventLoading, setEventLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Change password state
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);
    const [changePasswordErrors, setChangePasswordErrors] = useState({});
    const [changePasswordSuccess, setChangePasswordSuccess] = useState('');

    // Fetch member profile and event history on component mount
    useEffect(() => {
        fetchMemberData();
        fetchEventHistory();
    }, []);

    const fetchMemberData = async () => {
        if (!memberData) {
            setLoading(true);
            try {
                const result = await getMemberProfile();
                if (result.success) {
                    setMemberData(result.data);
                } else {
                    console.error('Failed to fetch profile:', result.error);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        } else {
        }
    };

    const fetchEventHistory = async () => {
        setEventLoading(true);
        try {
            const result = await getMemberEventHistory();
            if (result.success) {
                setEventHistory(result.data);
            } else {
                console.error('Failed to fetch event history:', result.error);
                setEventHistory([]);
            }
        } catch (error) {
            console.error('Error fetching event history:', error);
            setEventHistory([]);
        } finally {
            setEventLoading(false);
        }
    };

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await logout();
                onLogout();
            } catch (error) {
                console.error('Logout error:', error);
                onLogout(); // Logout locally even if API call fails
            }
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setChangePasswordErrors({});
        setChangePasswordSuccess('');

        // Validate form
        const newErrors = {};
        if (!changePasswordData.current_password) {
            newErrors.current_password = 'Password saat ini harus diisi';
        }
        if (!changePasswordData.password) {
            newErrors.password = 'Password baru harus diisi';
        } else if (changePasswordData.password.length < 8) {
            newErrors.password = 'Password baru harus minimal 8 karakter';
        }
        if (!changePasswordData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password baru harus diisi';
        } else if (changePasswordData.password !== changePasswordData.password_confirmation) {
            newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
        }

        if (Object.keys(newErrors).length > 0) {
            setChangePasswordErrors(newErrors);
            return;
        }

        setChangePasswordLoading(true);

        try {
            const result = await changePassword(changePasswordData);

            if (result.success) {
                setChangePasswordSuccess('Password berhasil diubah!');
                setChangePasswordData({
                    current_password: '',
                    password: '',
                    password_confirmation: ''
                });
                setTimeout(() => {
                    setShowChangePassword(false);
                    setChangePasswordSuccess('');
                }, 3000);
            } else {
                setChangePasswordErrors({ general: result.error });
                if (result.errors) {
                    setChangePasswordErrors(result.errors);
                }
            }
        } catch (error) {
            setChangePasswordErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
        } finally {
            setChangePasswordLoading(false);
        }
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setChangePasswordData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (changePasswordErrors[name]) {
            setChangePasswordErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getEventStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'completed';
            case 'upcoming':
                return 'upcoming';
            case 'cancelled':
                return 'cancelled';
            default:
                return 'upcoming';
        }
    };

    if (loading && !memberData) {
        return (
            <div className="member-loading">
                <div className="member-loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="member-details-container">
            {/* Header Section */}
            <div className="member-details-header">
                <h1 className="member-details-welcome">
                    Welcome back, {memberData?.name || 'Member'}!
                </h1>
                <p className="member-details-email">
                    {memberData?.email}
                </p>
                <div className="member-details-points">
                    <span className="points-label">Total Poin:</span>
                    <span className="points-value">
                        {(memberData?.total_points || 0).toLocaleString('id-ID')}
                    </span>
                    <span className="points-unit">pts</span>
                </div>
                <div className="member-details-actions">
                    <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="member-btn secondary"
                    >
                        {showChangePassword ? 'Batal' : 'Ganti Password'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="member-btn danger"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Change Password Form */}
            {showChangePassword && (
                <div className="member-change-password">
                    <h3 className="member-change-password-title">Ganti Password</h3>

                    {changePasswordSuccess && (
                        <div className="member-auth-success">
                            {changePasswordSuccess}
                        </div>
                    )}

                    {changePasswordErrors.general && (
                        <div className="member-auth-error">
                            {changePasswordErrors.general}
                        </div>
                    )}

                    <form onSubmit={handleChangePassword}>
                        <div className="member-form-group">
                            <label htmlFor="current_password" className="member-form-label">
                                Password Saat Ini
                            </label>
                            <input
                                type="password"
                                id="current_password"
                                name="current_password"
                                value={changePasswordData.current_password}
                                onChange={handlePasswordInputChange}
                                className={`member-profile-edit-input ${changePasswordErrors.current_password ? 'error' : ''}`}
                                placeholder="Masukkan password saat ini"
                                disabled={changePasswordLoading}
                            />
                            {changePasswordErrors.current_password && (
                                <span className="member-form-error">{changePasswordErrors.current_password}</span>
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
                                value={changePasswordData.password}
                                onChange={handlePasswordInputChange}
                                className={`member-profile-edit-input ${changePasswordErrors.password ? 'error' : ''}`}
                                placeholder="Masukkan password baru (min. 8 karakter)"
                                disabled={changePasswordLoading}
                            />
                            {changePasswordErrors.password && (
                                <span className="member-form-error">{changePasswordErrors.password}</span>
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
                                value={changePasswordData.password_confirmation}
                                onChange={handlePasswordInputChange}
                                className={`member-profile-edit-input ${changePasswordErrors.password_confirmation ? 'error' : ''}`}
                                placeholder="Ulangi password baru"
                                disabled={changePasswordLoading}
                            />
                            {changePasswordErrors.password_confirmation && (
                                <span className="member-form-error">{changePasswordErrors.password_confirmation}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="member-form-submit"
                            disabled={changePasswordLoading}
                        >
                            {changePasswordLoading ? 'Menyimpan...' : 'Simpan Password Baru'}
                        </button>
                    </form>
                </div>
            )}

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

            {/* Content Grid */}
            <div className="member-details-grid">
                {/* Profile Section */}
                <div className="member-details-section">
                    <h2 className="member-details-section-title">
                        Profil Member
                    </h2>

                    <div>
                        <div className="member-profile-field">
                            <label className="member-profile-label">Nama</label>
                            <div className="member-profile-value">
                                {memberData?.name || 'Not provided'}
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">Email</label>
                            <div className="member-profile-value">
                                {memberData?.email || 'Not provided'}
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">No. HP</label>
                            <div className="member-profile-value">
                                {memberData?.phone || 'Not provided'}
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">Umur</label>
                            <div className="member-profile-value">
                                {memberData?.age || 'Not provided'}
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">Jenis Kelamin</label>
                            <div className="member-profile-value">
                                {memberData?.gender ? 
                                    (memberData.gender === 'male' ? 'Laki-laki' : 'Perempuan') 
                                    : 'Not provided'
                                }
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">Bergabung Sejak</label>
                            <div className="member-profile-value">
                                {formatDate(memberData?.created_at)}
                            </div>
                        </div>

                        <div className="member-profile-field">
                            <label className="member-profile-label">Total Poin</label>
                            <div className="member-profile-value points-highlight">
                                {(memberData?.total_points || 0).toLocaleString('id-ID')} poin
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event History Section */}
                <div className="member-details-section">
                    <h2 className="member-details-section-title">
                        Aktifitas Anda
                    </h2>

                    {eventLoading ? (
                        <div className="member-loading">
                            <div className="member-loading-spinner"></div>
                        </div>
                    ) : eventHistory.length > 0 ? (
                        <div className="member-event-list">
                            {eventHistory.map((event, index) => (
                                <div key={event.id || index} className="member-event-item">
                                    <h3 className="member-event-title">
                                        {event.title || '' }
                                    </h3>
                                    <p className="member-event-date">
                                        {event.date || 'N/A'}
                                    </p>
                                    <span className={`member-event-status ${getEventStatusClass(event.status)}`}>
                                        {event.points_gained || 'N/A'} Poin
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="member-empty-state">
                            <h3>Belum Ada Aktifitas</h3>
                            <p>Anda belum mengikuti acara apapun. Mulai menjelajahi acara-acara kami!</p>
                            <button className="member-btn primary" style={{ margin: '0 auto' }} onClick={() => {
                                window.location.href = '/#daftar';
                            }}>
                                Cari Acara
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;
