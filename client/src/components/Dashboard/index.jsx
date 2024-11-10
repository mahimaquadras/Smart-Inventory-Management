import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';
import styles from './Dashboard.module.css'; // Import your CSS module
import ProductList from './FinishedProductList';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const [widgets, setWidgets] = useState({
    totalCustomers: 0,
    totalSales: 0,
    monthlySales: 0,
    yearlySales: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [finishedProducts, setFinishedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, salesRes, salesDataRes, pieDataRes, finishedProductsRes] = await Promise.all([
          axios.get('http://localhost:8090/api/customers/total'),
          axios.get('http://localhost:8090/api/sales/summary'),
          axios.get('http://localhost:8090/api/sales/data'),
          axios.get('http://localhost:8090/api/sales/pie'),
          axios.get('http://localhost:8090/api/finished-products'),
        ]);

        setWidgets({
          totalCustomers: customersRes.data.total || 0,
          totalSales: salesRes.data.totalSales || 0,
          monthlySales: salesRes.data.monthlySales || 0,
          yearlySales: salesRes.data.yearlySales || 0,
        });

        setSalesData(salesDataRes.data || []);
        setPieChartData(pieDataRes.data || []);
        setFinishedProducts(finishedProductsRes.data || []);

        // Trigger pop-up for products with quantity 0
        finishedProductsRes.data.forEach(product => {
          if (product.qntyAvailable === 0) {
            alert(`${product.itemName} is out of stock! Prepare more.`);
          }
        });

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Prepare data for the line chart
  const chartData = {
    labels: salesData.map(data => data._id),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(data => data.totalSales),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Prepare data for the pie chart
  const pieChartDataFormatted = pieChartData.map(item => ({
    name: item._id,
    value: item.totalQuantity,
  }));

  return (
    <div className={styles.dashboard}>
      <div className={styles.widgetContainer}>
        <div className={styles.widget}>
          <h3>Total Customers</h3>
          <p>{widgets.totalCustomers.toLocaleString()}</p>
        </div>
        <div className={styles.widget}>
          <h3>Total Sales</h3>
          <p>₹{widgets.totalSales.toFixed(2)}</p>
        </div>
        <div className={styles.widget}>
          <h3>Monthly Sales</h3>
          <p>₹{widgets.monthlySales.toFixed(2)}</p>
        </div>
        <div className={styles.widget}>
          <h3>Yearly Sales</h3>
          <p>₹{widgets.yearlySales.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.lineChart}>
          <h3>Total Sales Over Time</h3>
          <Line data={chartData} />
        </div>

        <div className={styles.pieChart}>
          <h3>Items Purchased</h3>
          <div className={styles.chartWrapper}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartDataFormatted}
                dataKey="value"
                nameKey="name"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {pieChartDataFormatted.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FFB3E6'][index % 5]} />
                ))}
              </Pie>
              <PieTooltip />
              <PieLegend />
            </PieChart>
          </div>
        </div>
      </div>

      <ProductList />
    </div>
  );
};

export default Dashboard;
