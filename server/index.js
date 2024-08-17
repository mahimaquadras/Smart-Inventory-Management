require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const createOrderRoutes = require("./routes/createOrder");
const rawMaterialRoutes = require("./routes/rawMaterial");
const finishedProductsRoutes = require("./routes/finishedProducts");
const salesRouter = require('./routes/sales');
const dashboardRoutes = require('./routes/dashboard');
const salesRoutes = require('./routes/sales');
const rawMaterialsRoutes = require('./routes/rawMaterial');
const mostSoldItemRoutes = require('./routes/mostSoldItem');
const metricsRoutes = require('./routes/metrics');
const createOrders = require('./models/createOrder');
const { User } = require('./models/user');


//database connection
connection();


//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/createOrder", createOrderRoutes);
app.use("/api/rawMaterial", rawMaterialRoutes);
app.use("/api/finishedProducts", finishedProductsRoutes);
app.use("/api/sales", salesRouter);
app.use("/api/metrics", metricsRoutes)




app.use('/api/dashboard', dashboardRoutes);

app.use('/api/sales', salesRoutes);
app.use('/api/rawMaterials', rawMaterialsRoutes);
app.use('/api/mostSoldItem', mostSoldItemRoutes);

// Routes
app.get('/api/sales', async (req, res) => {
    const range = req.query.range;
    const startDate = new Date();
    let endDate = new Date();
  
    if (range === '1day') {
      startDate.setDate(startDate.getDate() - 1);
    } else if (range === '1week') {
      startDate.setDate(startDate.getDate() - 7);
    }
  
    try {
      const orders = await createOrders.aggregate([
        { $match: { orderDate: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, totalSales: { $sum: { $sum: '$items.price' } } } },
        { $project: { _id: 0, totalSales: 1 } }
      ]);
  
      res.json(orders[0] || { totalSales: 0 });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch sales data' });
    }
  });
  
  app.get('/api/raw-materials', async (req, res) => {
    try {
      const materials = await rawMaterials.aggregate([
        { $group: { _id: '$type', totalQuantity: { $sum: '$quantity' } } },
        { $project: { _id: 0, type: '$_id', totalQuantity: 1 } }
      ]);
  
      res.json(materials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch raw materials data' });
    }
  });
  
  app.get('/api/most-sold-item', async (req, res) => {
    try {
      const mostSoldItem = await createOrders.aggregate([
        { $unwind: '$items' },
        { $group: { _id: '$items.itemName', totalQuantity: { $sum: '$items.quantity' } } },
        { $sort: { totalQuantity: -1 } },
        { $limit: 1 }
      ]);
  
      res.json(mostSoldItem[0] || { itemName: 'N/A', totalQuantity: 0 });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch most sold item data' });
    }
  });
  

  // In your Express app
app.get('/api/metrics', async (req, res) => {
  try {
    // Fetch your metrics data here
    const totalCustomers = await getTotalCustomers();
    const salesToday = await getSalesToday();
    const monthlySales = await getMonthlySales();
    const yearlySales = await getYearlySales();

    res.json({
      totalCustomers,
      salesToday,
      monthlySales,
      yearlySales
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics data' });
  }
});

app.get('/api/customers/total', async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();
    res.json({ total: totalCustomers });
  } catch (err) {
    console.error('Error fetching total customers:', err);
    res.status(500).json({ message: 'Error fetching total customers' });
  }
});

app.get('/api/sales/summary', async (req, res) => {
  try {
    // Define the start of the current month and year
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // Total Sales
    const totalSalesResult = await createOrders.aggregate([
      { $unwind: "$items" },
      { $group: { _id: null, totalSales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

    // Monthly Sales
    const monthlySalesResult = await createOrders.aggregate([
      { $unwind: "$items" },
      { $match: { orderDate: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: null, monthlySales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const monthlySales = monthlySalesResult.length > 0 ? monthlySalesResult[0].monthlySales : 0;

    // Yearly Sales
    const yearlySalesResult = await createOrders.aggregate([
      { $unwind: "$items" },
      { $match: { orderDate: { $gte: startOfYear, $lt: endOfYear } } },
      { $group: { _id: null, yearlySales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const yearlySales = yearlySalesResult.length > 0 ? yearlySalesResult[0].yearlySales : 0;

    res.json({ totalSales, monthlySales, yearlySales });
  } catch (err) {
    console.error('Error fetching sales summary:', err);
    res.status(500).json({ message: 'Error fetching sales summary' });
  }
});




const port = process.env.PORT||8090;
app.listen(port, () => {
    console.log('Listening on port 8090')
})
