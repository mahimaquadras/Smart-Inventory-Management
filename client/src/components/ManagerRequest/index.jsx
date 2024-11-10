
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { FaSpinner } from 'react-icons/fa';

const ManagerRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); 
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
       
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://smart-inventory-management-api.onrender.com/api/manager/managerRequest');
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

    const handleApprove = async (id) => {
        setActionLoading(id);
        setError(null);
        setSuccess(null);

        try {
            const managerName = 'Manager'; 
            const response = await axios.put(`https://smart-inventory-management-api.onrender.com/api/manager/managerRequest/${id}/approve`, { managerName });
            setSuccess('Request approved successfully.');

           
            setRequests(requests.map(req => req._id === id ? response.data.request : req));
        } catch (err) {
            console.error('Error approving request:', err);
            setError(err.response?.data?.message || 'Failed to approve request.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        setActionLoading(id);
        setError(null);
        setSuccess(null);

        try {
            const managerName = 'Manager'; 
            const response = await axios.put(`https://smart-inventory-management-api.onrender.com/api/manager/managerRequest/${id}/reject`, { managerName });
            setSuccess('Request rejected successfully.');

           
            setRequests(requests.map(req => req._id === id ? response.data.request : req));
        } catch (err) {
            console.error('Error rejecting request:', err);
            setError(err.response?.data?.message || 'Failed to reject request.');
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>Manager Dashboard</h1>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

               
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Raw Material Requests</h2>
                    {loading ? (
                        <div className={styles.spinnerContainer}>
                            <FaSpinner className={styles.spinner} />
                        </div>
                    ) : requests.length > 0 ? (
                        <table className={styles.requestsTable}>
                            <thead>
                                <tr>
                                    <th>Material Name</th>
                                    <th>Quantity</th>
                                    <th>Requested By</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => (
                                    <tr key={request._id} className={styles[request.status.toLowerCase()]}>
                                        <td>{request.materialName}</td>
                                        <td>{request.requestedQuantity}</td>
                                        <td>{request.notes ? request.notes : 'N/A'}</td>
                                        <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                                        <td>{request.status}</td>
                                        <td>{request.notes || 'None'}</td>
                                        <td>
                                            {request.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className={`${styles.actionButton} ${styles.approve}`}
                                                        onClick={() => handleApprove(request._id)}
                                                        disabled={actionLoading === request._id}
                                                    >
                                                        {actionLoading === request._id ? <FaSpinner className={styles.spinner} /> : 'Approve'}
                                                    </button>
                                                    <button
                                                        className={`${styles.actionButton} ${styles.reject}`}
                                                        onClick={() => handleReject(request._id)}
                                                        disabled={actionLoading === request._id}
                                                    >
                                                        {actionLoading === request._id ? <FaSpinner className={styles.spinner} /> : 'Reject'}
                                                    </button>
                                                </>
                                            )}
                                            {request.status !== 'Pending' && (
                                                <span>No actions available</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No raw material requests found.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ManagerRequest;
