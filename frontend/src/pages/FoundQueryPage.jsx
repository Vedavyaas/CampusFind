import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../components/FormField';
import { FileUpload } from '../components/FileUpload';
import { Button } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { WhatHappensNext } from '../components/WhatHappensNext';
import { FormSectionIndicator } from '../components/FormSectionIndicator';
import { submitFoundQuery } from '../api/apiClient';
import { User, PackageCheck, MapPin, Camera, Send, ArrowLeft } from 'lucide-react';

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

const FORM_STEPS = ['Your Details', 'Item Details', 'Where It Was Found', 'Photos'];

export function FoundQueryPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    itemName: '',
    category: '',
    characteristics: '',
    location: '',
  });

  const [itemImage, setItemImage] = useState(null);
  const [locationImage, setLocationImage] = useState(null);
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

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number / ID is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select an item category.';
    }

    if (!formData.characteristics.trim()) {
      newErrors.characteristics = 'Characteristics/description is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Found location is required.';
    }

    if (!itemImage) {
      newErrors.itemImage = 'An image of the found item is required.';
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
      await submitFoundQuery({
        ...formData,
        itemImage,
        locationImage,
      });

      navigate('/success', {
        state: {
          message: 'Query submitted. Please hand over the physical item to administration.',
          type: 'found',
        },
      });
    } catch (err) {
      setIsSubmitting(false);
      if (err.response && err.response.status === 400) {
        const backendMsg = err.response.data?.message || err.response.data?.error;
        setServerError(backendMsg || 'Invalid query data provided. Please check all fields and try again.');
      } else {
        setServerError('Unable to submit your query right now due to a network error. Please try again later.');
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
        <h1 className="form-title">Submit Found Item Query</h1>
        <p className="form-subtitle">
          If you have found a lost item on campus, submit its details below. All fields are required except location image.
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
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. Ananya Sen"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="rollNumber"
              label="Roll Number / ID"
              value={formData.rollNumber}
              onChange={handleChange}
              error={errors.rollNumber}
              placeholder="e.g. 22EC102"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="e.g. finder@college.edu"
              required
              disabled={isSubmitting}
            />
            <FormField
              id="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="e.g. 9876543210"
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Section 2: Item Details */}
        <section className="form-section">
          <h2 className="section-title">
            <PackageCheck size={18} color="#2563eb" />
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
                placeholder="e.g. Black Metal Water Bottle"
                required
                disabled={isSubmitting}
              />
              <FormField
                id="category"
                label="Category"
                type="select"
                options={CATEGORY_OPTIONS}
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
                placeholder="Select category..."
                required
                disabled={isSubmitting}
              />
            </div>

            <FormField
              id="characteristics"
              label="Characteristics & Visual Description"
              type="textarea"
              value={formData.characteristics}
              onChange={handleChange}
              error={errors.characteristics}
              placeholder="Describe distinguishing features, markings, condition..."
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>
        </section>

        {/* Section 3: Where It Was Found */}
        <section className="form-section">
          <h2 className="section-title">
            <MapPin size={18} color="#2563eb" />
            <span>Where It Was Found</span>
          </h2>
          <FormField
            id="location"
            label="Found Location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            placeholder="e.g. Table near Canteen 1"
            required
            disabled={isSubmitting}
          />
        </section>

        {/* Section 4: Photos */}
        <section className="form-section">
          <h2 className="section-title">
            <Camera size={18} color="#2563eb" />
            <span>Photos</span>
          </h2>
          <div className="form-grid form-grid-2">
            <FileUpload
              id="itemImage"
              label="Item Image (Required)"
              file={itemImage}
              onChange={(file) => {
                setItemImage(file);
                if (errors.itemImage) setErrors((prev) => ({ ...prev, itemImage: '' }));
              }}
              onRemove={() => setItemImage(null)}
              error={errors.itemImage}
              required
              helpText="Upload a clear photo of the found physical item"
              disabled={isSubmitting}
            />
            <FileUpload
              id="locationImage"
              label="Location Image (Optional)"
              file={locationImage}
              onChange={(file) => setLocationImage(file)}
              onRemove={() => setLocationImage(null)}
              error={errors.locationImage}
              required={false}
              helpText="Upload a photo of the spot/location where item was found"
              disabled={isSubmitting}
            />
          </div>
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
            Submit Found Query
          </Button>
        </div>
      </form>
    </div>
  );
}
