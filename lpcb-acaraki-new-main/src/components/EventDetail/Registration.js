import React, { useState } from 'react';
import './Registration.scss';
import FileInput from './FileInput';
import axios from 'axios';
import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Configure axios defaults for cross-domain cookies
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  }
});

const Registration = ({slug, registrationFields}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [idImage, setIdImage] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [successCountdown, setSuccessCountdown] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    job_title: '',
    age: '',
    gender: '',
    short_bio: ''
  });

  const handleOpen = () => {
    setIsOpen(true);
    setErrors({});
    setSuccess(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    setErrors({});
    setSuccess(false);
  };

  const handleChange = (e) => {
    const { id, value, files, type, name } = e.target;
    if (type === 'radio') {
        setFormData(prev => ({
            ...prev,
            [name]: id // For radio buttons, use the id as the value
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [id]: type === 'file' ? files[0] : value
        }));
    }
    
    // Clear error for this field when user makes a change
    if (errors[id]) {
        setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[id];
            return newErrors;
        });
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    switch (fieldName) {
      case 'file_1':
        setFile1(file);
        break;
      case 'file_2':
        setFile2(file);
        break;
      case 'file_3':
        setFile3(file);
        break;
      case 'file_4':
        setFile4(file);
        break;
      case 'file_5':
        setFile5(file);
        break;
      case 'id_image':
        setIdImage(file);
        break;
    }
  };



  // Set default values for select fields in formData
  useEffect(() => {
    if (registrationFields && registrationFields.length > 0) {
      setFormData(prev => {
        const updated = { ...prev };
        registrationFields.forEach(field => {
          if (field.type === 'select' && field.options && field.options.length > 0) {
            if (!updated[field.name] || updated[field.name] === '') {
              updated[field.name] = field.options[0];
            }
          }
        });
        return updated;
      });
    }
  }, [registrationFields]);

  const validateForm = () => {
    const newErrors = {};

    registrationFields.forEach(field => {
      if (field.type === 'select') {
        if (!formData[field.name]) newErrors[field.name] = 'Pilihan wajib diisi';
      }
      else if (field.name === 'id_image') {
        if (!idImage) newErrors[field.name] = field.label + ' wajib diisi';
        if (idImage && idImage.size > 5 * 1024 * 1024) newErrors[field.name] = 'Ukuran file terlalu besar (max 5MB)';
      }
      else if (['file_1', 'file_2', 'file_3', 'file_4', 'file_5'].includes(field.name)) {
        let fileToCheck = null;
        switch (field.name) {
          case 'file_1': fileToCheck = file1; break;
          case 'file_2': fileToCheck = file2; break;
          case 'file_3': fileToCheck = file3; break;
          case 'file_4': fileToCheck = file4; break;
          case 'file_5': fileToCheck = file5; break;
        }
        if (!fileToCheck) newErrors[field.name] = field.label + ' wajib diisi';
        if (fileToCheck && fileToCheck.size > 5 * 1024 * 1024) newErrors[field.name] = 'Ukuran file terlalu besar (max 5MB)';
      }
      else {
        if (!formData[field.name] || !formData[field.name].trim()) newErrors[field.name] = field.label + ' wajib diisi';
        if (field.type === 'email' && formData[field.name]) {
          if (!/\S+@\S+\.\S+/.test(formData[field.name])) newErrors[field.name] = 'Format email tidak valid';
        }
      }
    });

    console.log(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    

    
    setLoading(true);
    
    try {
      // Create form data for file upload
      const formPayload = new FormData();
      
      // Add all form fields to FormData except the file
      registrationFields.forEach(field => {
        if (field.type !== 'file') {
          formPayload.append(field.name, formData[field.name]);
        } else {
          if (field.name === 'id_image') {
            formPayload.append(field.name, idImage);
          } else if (field.name === 'file_1') {
            formPayload.append(field.name, file1);
          } else if (field.name === 'file_2') {
            formPayload.append(field.name, file2);
          } else if (field.name === 'file_3') {
            formPayload.append(field.name, file3);
          } else if (field.name === 'file_4') {
            formPayload.append(field.name, file4);
          } else if (field.name === 'file_5') {
            formPayload.append(field.name, file5);
          }
        }
      });


    console.log({formPayload});
            
    // Create submission headers
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    
    // Make the API call
    const response = await api.post(`/event/${slug}/submission`, formPayload, { headers });
    // Handle successful response
    if (response.data.status === 'success') {
        setSuccess(true);
        // Reset form data
        setFormData({
            name: '', email: '', phone: '', job_title: '', age: '', gender: '', short_bio: '', id_image: null, file_1: null
        });
        setErrors({});
    } else {
        // If the server returns success: false
        setErrors({ general: response.data.message || 'Terjadi kesalahan saat mengirim form.' });
    }
  } catch (error) {
      console.error('Submission error:', error);
      
      // Detailed error logging
      if (error.response) {
          if (error.response.data && error.response.data.errors) {
              setErrors(error.response.data.errors);
          } else if (error.response.data && error.response.data.message) {
              setErrors({ general: error.response.data.message });
          } else {
              setErrors({ general: `Terjadi kesalahan saat mengirim form (${error.response.status})` });
          }
      } else if (error.request) {
          // Request was made but no response was received
          console.error('No response received:', error.request);
          setErrors({ general: 'Server tidak merespon. Silakan coba lagi nanti.' });
      } else {
          // Something happened in setting up the request
          console.error('Request error:', error.message);
          setErrors({ general: 'Terjadi kesalahan saat mengirim form.' });
      }
    } finally {
        setLoading(false);
        setSuccessCountdown(5);
        const interval = setInterval(() => {
          setSuccessCountdown(prev => prev - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          handleClose();
        }, 5000);
    }
  };
  return (
    <div className="registration-container">
      <button 
        className="register-button"
        onClick={handleOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M15 5V7M15 11V13M15 17V19M5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V10C20.4696 10 19.9609 10.2107 19.5858 10.5858C19.2107 10.9609 19 11.4696 19 12C19 12.5304 19.2107 13.0391 19.5858 13.4142C19.9609 13.7893 20.4696 14 21 14V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V14C3.53043 14 4.03914 13.7893 4.41421 13.4142C4.78929 13.0391 5 12.5304 5 12C5 11.4696 4.78929 10.9609 4.41421 10.5858C4.03914 10.2107 3.53043 10 3 10V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5Z" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Register Now
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h4>Event Registration</h4>

            <form onSubmit={handleSubmit}>
              {registrationFields.map((field, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    >
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'radio' ? (
                    <div className="flex items-center gap-x-2">
                      {field.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-x-2">
                          <input type="radio" id={option.value} name={field.name} value={option.value} onChange={handleChange} />
                          <label htmlFor={option.value} className="whitespace-nowrap text-[12px] !font-normal text-[#0A0A0A]">{option.label}</label>
                        </div>
                      ))}
                    </div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                  ) : field.type === 'file' ? (
                    <FileInput
                      id={field.name}
                      name={field.name}
                      onChange={(e) => handleFileChange(e, field.name)}
                      selectedFile={field.name === 'id_image' ? idImage : field.name === 'file_1' ? file1 : field.name === 'file_2' ? file2 : field.name === 'file_3' ? file3 : field.name === 'file_4' ? file4 : field.name === 'file_5' ? file5 : null}
                      accept={field.accept}
                      sampleImage={field.sampleImage}
                      required={field.required}
                    />
                  ) : (
                  <input
                    type={field.type === 'email' ? 'email' : 'text'}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder || field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                  )
                  }
                  {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
                </div>
              ))}
              {/* <div className="form-group">
                <label htmlFor="gender">Jenis Kelamin</label>
                <div className="flex items-center gap-x-10">
                  <div className="flex items-center gap-x-2">
                    <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                    <label htmlFor="male" className="whitespace-nowrap text-[12px] !font-normal text-[#0A0A0A]">Laki-laki</label>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                    <label htmlFor="female" className="whitespace-nowrap text-[12px] !font-normal text-[#0A0A0A]">Perempuan</label>
                  </div>
                </div>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="story">Jelaskan cerita tentang karya desain Anda</label>
                <textarea
                  id="short_bio"
                  name="short_bio"
                  placeholder="Jelaskan cerita tentang karya desain Anda"
                  value={formData.short_bio}
                  onChange={handleChange}
                  required
                />
                {errors.short_bio && <div className="invalid-feedback">{errors.short_bio}</div>}
              </div> */}
              <div className="form-group">
                <div className="flex items-center gap-x-2">
                  <input type="checkbox" id="terms" name="terms" required />
                  <label htmlFor="terms" className="text-[14px] font-normal text-[#0A0A0A] mt-1">Saya setuju dan bersedia mengikuti seluruh syarat dan ketentuan yang berlaku.</label>
                </div>
                {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
              </div>


              {errors.general && (
                  <div className="alert alert-danger mb-4">
                      {errors.general}
                  </div>
              )}

              {success && (
                  <div className="alert alert-success mb-4 text-green-500">
                      Pendaftaran berhasil dikirim! ({successCountdown})
                  </div>
              )}
              
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Loading...' : 'Submit Registration'}
                {loading && <div className="loading-spinner"></div>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
