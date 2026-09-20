import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components/FormField';
import { FileUpload } from '../components/FileUpload';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { WhatHappensNext } from '../components/WhatHappensNext';
import { FormSectionIndicator } from '../components/FormSectionIndicator';
import { submitLostReport } from '../api/apiClient';
import { User, Package, Calendar, Camera, Send, ArrowLeft } from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Electronics',
  'Documents/ID Cards',
  'Keys',
  'Bags & Wallets',
  'Clothing & Apparel',
  'Books & Stationery',
  'Accessories & Jewellery',
  'Other',
];

const FORM_STEPS = ['Your Details', 'Item Details', 'When & Where', 'Item Photo'];

export function LostReportPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    studentName: '',
    studentRollNumber: '',
    studentEmail: '',
    studentPhone: '',
    itemName: '',
    itemCategory: '',
    itemCharacteristics: '',
    approxLostTime: '',
    approxLostLocation: '',
  });

  const [itemImage, setItemImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation helper
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Full name is required.';
    }

    if (!formData.studentRollNumber.trim()) {
      newErrors.studentRollNumber = 'Roll number is required.';
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.studentEmail.trim())) {
        newErrors.studentEmail = 'Please enter a valid email address.';
      }
    }

    if (!formData.studentPhone.trim()) {
      newErrors.studentPhone = 'Phone number is required.';
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required.';
    }

    if (!formData.itemCategory) {
      newErrors.itemCategory = 'Please select an item category.';
    }

    if (!formData.itemCharacteristics.trim()) {
      newErrors.itemCharacteristics = 'Characteristics/description is required.';
    }

    if (!formData.approxLostTime) {
      newErrors.approxLostTime = 'Approximate date & time of loss is required.';
    }

    if (!formData.approxLostLocation.trim()) {
      newErrors.approxLostLocation = 'Approximate location of loss is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLostReport({
        ...formData,
        itemImage,
      });

      navigate('/success', {
        state: {
          message: 'Your report has been successfully received.',
          type: 'lost',
        },
      });
    } catch (err) {
      setIsSubmitting(false);
      if (err.response && err.response.status === 400) {
        const backendMsg = err.response.data?.message || err.response.data?.error;
        setServerError(backendMsg || 'Invalid report data provided. Please check all fields and try again.');
      } else {
        setServerError('Unable to submit your report right now due to a network error. Please try again later.');
      }
    }
  };

  return (
    <div className="card">
      <div className="form-header">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
        <h1 className="form-title">Report a Lost Item</h1>
        <p className="form-subtitle">
          Fill out the details below to submit a lost item report. All fields are required except item image.
        </p>

        {/* Section Navigation Indicator */}
        <FormSectionIndicator steps={FORM_STEPS} />
      </div>

      <ErrorMessage message={serverError} />

      <form onSubmit={handleSubmit} noValidate>
        {/* Section 1: Your Details */}
        <section className="form-section">
          <h2 className="section-title">
            <User size={18} color="#2563eb" />
            <span>Your Details</span>
          </h2>
          <div className="form-grid form-grid-2">
            <FormField
              id="studentName"
              label="Student Full Name"
              value={formData.studentName}
              onChange={handleChange}
              error={errors.studentName}
              placeholder="e.g. Rahul Sharma"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="studentRollNumber"
              label="Roll Number / Student ID"
              value={formData.studentRollNumber}
              onChange={handleChange}
              error={errors.studentRollNumber}
              placeholder="e.g. 21CS045"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="studentEmail"
              label="Student Email Address"
              type="email"
              value={formData.studentEmail}
              onChange={handleChange}
              error={errors.studentEmail}
              placeholder="e.g. student@college.edu"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="studentPhone"
              label="Phone Number"
              type="tel"
              value={formData.studentPhone}
              onChange={handleChange}
              error={errors.studentPhone}
              placeholder="e.g. 9876543210"
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Section 2: Item Details */}
        <section className="form-section">
          <h2 className="section-title">
            <Package size={18} color="#2563eb" />
            <span>Item Details</span>
          </h2>
          <div className="form-grid">
            <div className="form-grid form-grid-2">
              <FormField
                id="itemName"
                label="Item Name"
                value={formData.itemName}
                onChange={handleChange}
                error={errors.itemName}
                placeholder="e.g. Blue HP Laptop Charger"
                required
                disabled={isSubmitting}
              />
              <FormField
                id="itemCategory"
                label="Category"
                type="select"
                options={CATEGORY_OPTIONS}
                value={formData.itemCategory}
                onChange={handleChange}
                error={errors.itemCategory}
                placeholder="Select category..."
                required
                disabled={isSubmitting}
              />
            </div>

            <FormField
              id="itemCharacteristics"
              label="Detailed Characteristics & Identification Marks"
              type="textarea"
              value={formData.itemCharacteristics}
              onChange={handleChange}
              error={errors.itemCharacteristics}
              placeholder="Describe color, brand, distinct scratches, contents, serial numbers, or stickers..."
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Section 3: When & Where */}
        <section className="form-section">
          <h2 className="section-title">
            <Calendar size={18} color="#2563eb" />
            <span>When &amp; Where</span>
          </h2>
          <div className="form-grid form-grid-2">
            <FormField
              id="approxLostTime"
              label="Approximate Time of Loss"
              type="datetime-local"
              value={formData.approxLostTime}
              onChange={handleChange}
              error={errors.approxLostTime}
              required
              disabled={isSubmitting}
            />
            <FormField
              id="approxLostLocation"
              label="Approximate Location of Loss"
              value={formData.approxLostLocation}
              onChange={handleChange}
              error={errors.approxLostLocation}
              placeholder="e.g. Central Library 2nd Floor, Seminar Hall B"
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Section 4: Item Photo */}
        <section className="form-section">
          <h2 className="section-title">
            <Camera size={18} color="#2563eb" />
            <span>Item Photo</span>
          </h2>
          <FileUpload
            id="itemImage"
            label="Item Image (Optional)"
            file={itemImage}
            onChange={(file) => setItemImage(file)}
            onRemove={() => setItemImage(null)}
            error={errors.itemImage}
            required={false}
            helpText="Upload a photo of the item or similar reference image if available"
            disabled={isSubmitting}
          />
        </section>

        {/* What Happens Next Information Panel */}
        <WhatHappensNext />

        {/* Action Button */}
        <div style={{ marginTop: '2rem' }}>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
            icon={Send}
          >
            Submit Lost Report
          </Button>
        </div>
      </form>
    </div>
  );
}
