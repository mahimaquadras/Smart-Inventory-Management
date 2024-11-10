
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { FaSpinner } from 'react-icons/fa';

const ManageRawMaterials = () => {
    const [materialName, setMaterialName] = useState('');
    const [requestedQuantity, setRequestedQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://smart-inventory-management-api.onrender.com/api/rawMaterialRequest');
                setRequests(response.data.requests);
            } catch (err) {
                console.error('Error fetching raw material requests:', err);
                setError('Failed to load raw material requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('https://smart-inventory-management-api.onrender.com/api/rawMaterialRequest', {
                materialName,
                requestedQuantity: Number(requestedQuantity),
                notes
            });

            setSuccess('Request submitted successfully!');
            setMaterialName('');
            setRequestedQuantity('');
            setNotes('');

            setRequests([response.data.request, ...requests]);
        } catch (err) {
            console.error('Error submitting raw material request:', err);
            setError(err.response?.data?.message || 'Failed to submit request.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Manage Raw Materials</h1>

            <section className={styles.requestSection}>
                <h2 className={styles.sectionTitle}>Submit a New Request</h2>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="materialName">Material Name</label>
                        <input
                            type="text"
                            id="materialName"
                            value={materialName}
                            onChange={(e) => setMaterialName(e.target.value)}
                            required
                            placeholder="e.g., Flour"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="requestedQuantity">Requested Quantity</label>
                        <input
                            type="number"
                            id="requestedQuantity"
                            value={requestedQuantity}
                            onChange={(e) => setRequestedQuantity(e.target.value)}
                            required
                            min="1"
                            placeholder="e.g., 10"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="notes">Notes (Optional)</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any additional information..."
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitButton} disabled={submitting}>
                        {submitting ? <FaSpinner className={styles.spinner} /> : 'Submit Request'}
                    </button>
                </form>
            </section>

            <section className={styles.requestsSection}>
                <h2 className={styles.sectionTitle}>Existing Requests</h2>
                {loading ? (
                    <div className={styles.spinnerContainer}>
                        <FaSpinner className={styles.spinner} />
                    </div>
                ) : requests.length > 0 ? (
                    <div className={styles.requestsList}>
                        {requests.map(request => (
                            <div key={request._id} className={styles.requestCard}>
                                <h3 className={styles.requestTitle}>{request.materialName}</h3>
                                <p><strong>Quantity:</strong> {request.requestedQuantity}</p>
                                <p><strong>Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {request.status}</p>
                                {request.notes && <p><strong>Notes:</strong> {request.notes}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No raw material requests found.</p>
                )}
            </section>
        </div>
    );
};

export default ManageRawMaterials;
