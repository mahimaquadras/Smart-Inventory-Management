import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; 


const rawMaterials = [
  { name: 'All Purpose Flour' },
  { name: 'Cocoa Powder' },
  { name: 'Sugar' },
  { name: 'Butter' },
  { name: 'Whipping Cream' },
  { name: 'Fresh Cream' },
  { name: 'Dark Chocolate' },
  { name: 'White Chocolate' }
];

const RawMaterialForm = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [error, setError] = useState('');
  const [rawMaterialList, setRawMaterialList] = useState([]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const res = await axios.get('http://localhost:8090/api/rawMaterial');
        setRawMaterialList(res.data);
      } catch (err) {
        setError('Failed to fetch raw materials');
      }
    };
    fetchRawMaterials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/api/rawMaterial', {
        name: selectedMaterial,
        quantity: parseFloat(quantity),
        pricePerKg: parseFloat(pricePerKg)
      });
      
      setRawMaterialList([...rawMaterialList, response.data]);
      
      setSelectedMaterial('');
      setQuantity('');
      setPricePerKg('');
    } catch (err) {
      setError('Failed to add raw material');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Raw Material</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="material">Raw Material</label>
          <select
            id="material"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            required
          >
            <option value="">Select a material</option>
            {rawMaterials.map((material) => (
              <option key={material.name} value={material.name}>
                {material.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity (in kg)</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pricePerKg">Price per kg (in Rs)</label>
          <input
            id="pricePerKg"
            type="number"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            required
            min="0"
          />
        </div>
        <button type="submit" className={styles.submitButton}>Add Raw Material</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      <h2>Raw Material List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity (kg)</th>
            <th>Price per kg (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterialList.map((material, index) => (
            <tr key={index}>
              <td>{material.name}</td>
              <td>{material.quantity}</td>
              <td>{material.pricePerKg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterialForm;
