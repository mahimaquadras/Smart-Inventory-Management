import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'; // Import your CSS module

const FinishedProductForm = () => {
  const [name, setName] = useState('');
  const [rawMaterials, setRawMaterials] = useState([]);
  const [rawMaterialNames, setRawMaterialNames] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRawMaterialNames = async () => {
      try {
        const res = await axios.get('http://localhost:8090/api/rawMaterial/unique-names');
        setRawMaterialNames(res.data);
      } catch (err) {
        setError('Failed to fetch raw material names');
      }
    };
    fetchRawMaterialNames();

    const fetchProductNames = async () => {
      try {
        const res = await axios.get('http://localhost:8090/api/items/itemName');
        setProductNames(res.data);
      } catch (err) {
        setError('Failed to fetch product names');
      }
    };
    fetchProductNames();
  }, []);

  const handleAddRawMaterial = () => {
    setRawMaterials([...rawMaterials, { materialName: '', quantityUsed: '' }]);
  };

  const handleRawMaterialChange = (index, field, value) => {
    const newRawMaterials = [...rawMaterials];
    newRawMaterials[index][field] = value;
    setRawMaterials(newRawMaterials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8090/api/finishedProducts', {
        name,
        rawMaterials
      });
      setName('');
      setRawMaterials([]);
      setError(''); // Clear any previous error
      toast.success('Finished product added successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add finished product';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.title}>Add Finished Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {productNames.map((product) => (
              <option key={product._id} value={product.itemName}>
                {product.itemName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Raw Materials Used</label>
          {rawMaterials.map((item, index) => (
            <div key={index} className={styles.rawMaterialGroup}>
              <select
                value={item.materialName}
                onChange={(e) => handleRawMaterialChange(index, 'materialName', e.target.value)}
                required
              >
                <option value="">Select Material</option>
                {rawMaterialNames.map((materialName, index) => (
                  <option key={index} value={materialName}>
                    {materialName}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity Used"
                value={item.quantityUsed}
                onChange={(e) => handleRawMaterialChange(index, 'quantityUsed', e.target.value)}
                required
                min="0"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddRawMaterial} className={styles.addButton}>
            Add Raw Material
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>Add Finished Product</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default FinishedProductForm;
