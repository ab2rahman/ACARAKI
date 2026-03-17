"use client";

import { useState, useEffect } from 'react';
import { getMemberProfile, getMemberEventHistory, logout } from '@/utils/auth';
import './member.scss';

const MemberDetails = ({ memberData, setMemberData, onLogout }) => {
    const [loading, setLoading] = useState(false);
    const [eventHistory, setEventHistory] = useState([]);
    const [eventLoading, setEventLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

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
                        onClick={handleLogout}
                        className="member-btn danger"
                    >
                        Logout
                    </button>
                </div>
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
