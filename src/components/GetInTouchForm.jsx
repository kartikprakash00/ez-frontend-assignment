import React, { useEffect, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const servicesOptions = [
    'Presentation Design',
    'Animation Videos',
    'Language Services',
    'Web Development',
    'Marketing Support',
    'Graphics & Video',
    'Software Solutions'
];

const GetInTouchForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        countryCode: '91',
        phoneNumber: '',
        email: '',
        services: [],
        message: '',
        consent: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const formRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: formData.name,
            country_code: `+${formData.countryCode}`,
            phone_no: formData.phoneNumber,
            email: formData.email,
            service: formData.services,
            message: formData.message,
            promotion: formData.consent,
        };

        try {
            const response = await fetch('https://test.ezworks.ai/form-api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSuccessMessage('Form submitted successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error('Submission failed:', errorData);
                alert('Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div ref={formRef} className="bg-white rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">

                <div className="bg-[#0F1C3F] text-white flex flex-col justify-center items-center p-8 w-full md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4 text-center">Send us a brief</h2>
                    <p className="text-center text-lg">
                        Our team will get in touch with you within 10 Minutes!
                    </p>
                </div>


                <div className="relative flex-1 p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        &times;
                    </button>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded w-full text-black"
                        />


                        <PhoneInput
                            country={'in'}
                            value={formData.countryCode + formData.phoneNumber}
                            onChange={(value, data) => {
                                const dialCode = data.dialCode || '';
                                const phone = value.replace(dialCode, '');
                                setFormData(prev => ({
                                    ...prev,
                                    countryCode: dialCode,
                                    phoneNumber: phone,
                                }));
                            }}
                            inputClass="!w-full !border !rounded !text-black"
                            inputStyle={{ width: '100%' }}
                            countryCodeEditable={false}
                            enableSearch
                        />


                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded w-full text-black"
                        />


                        <div className="flex flex-col gap-2 text-black">
                            <select
                                onChange={(e) => {
                                    const selectedService = e.target.value;
                                    if (selectedService && !formData.services.includes(selectedService)) {
                                        setFormData(prev => ({
                                            ...prev,
                                            services: [...prev.services, selectedService],
                                        }));
                                    }
                                    e.target.value = '';
                                }}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Service</option>
                                {servicesOptions.map((service, idx) => (
                                    <option key={idx} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>


                            <div className="flex flex-wrap gap-2">
                                {formData.services.map((service, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center bg-white border border-gray-400 rounded-full px-3 py-1 text-sm"
                                    >
                                        {service}
                                        <button
                                            type="button"
                                            className="ml-2 text-gray-500 hover:text-red-600"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    services: prev.services.filter((s) => s !== service),
                                                }));
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded w-full text-black"
                            rows={4}
                        ></textarea>


                        <div className="flex items-center gap-2 text-black">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                            />
                            <label htmlFor="consent" className="text-sm">
                                I would like to receive promotional emails
                            </label>
                        </div>


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#EA7B2C] text-white py-2 rounded hover:bg-orange-600 mt-2"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>


                        {successMessage && (
                            <p className="text-green-500 text-center mt-2">{successMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetInTouchForm;
