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
const Item = require('./models/items');
const recipeRoutes = require('./routes/recipes')
const managerRawMaterialRequestsRoutes = require('./routes/managerRawMaterialRequest'); 
const rawMaterialRequestsRoutes = require('./routes/rawMaterialRequests'); 

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
app.use('/api/rawMaterialRequest', rawMaterialRequestsRoutes); 
app.use('/api/manager/managerRequest', managerRawMaterialRequestsRoutes); 
app.use("/api/sales", salesRouter);
app.use("/api/metrics", metricsRoutes)
app.use('/api/recipes', recipeRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/sales', salesRoutes);
app.use('/api/rawMaterials', rawMaterialsRoutes);
app.use('/api/mostSoldItem', mostSoldItemRoutes);
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

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
  
  
app.get('/api/customers/total', async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();
    res.json({ total: totalCustomers });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching total customers' });
  }
});

app.get('/api/sales/summary', async (req, res) => {
  try {
    // Total Sales
    const totalSales = await createOrders.aggregate([
      { $unwind: "$items" },
      { $group: { _id: null, totalSales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const total = totalSales.length > 0 ? totalSales[0].totalSales : 0;

    // Monthly Sales
    const monthlySales = await createOrders.aggregate([
      { $unwind: "$items" },
      { $match: { orderDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
      { $group: { _id: null, monthlySales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const monthly = monthlySales.length > 0 ? monthlySales[0].monthlySales : 0;

    // Yearly Sales
    const yearlySales = await createOrders.aggregate([
      { $unwind: "$items" },
      { $match: { orderDate: { $gte: new Date(new Date().getFullYear(), 0, 1) } } },
      { $group: { _id: null, yearlySales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
    ]);
    const yearly = yearlySales.length > 0 ? yearlySales[0].yearlySales : 0;

    res.json({ totalSales: total, monthlySales: monthly, yearlySales: yearly });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales summary' });
  }
});

app.get('/api/sales/data', async (req, res) => {
  try {
    const salesData = await createOrders.aggregate([
      { $unwind: "$items" },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }, totalSales: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } },
      { $sort: { _id: 1 } } // Sort by date
    ]);

    res.json(salesData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales data' });
  }
});

app.get('/api/purchases/data', async (req, res) => {
  try {
    const itemsPurchased = await createOrders.aggregate([
      { $unwind: "$items" }, // Deconstructs the items array
      { $group: { _id: "$items.itemName", totalQuantity: { $sum: "$items.quantity" } } },
      { $sort: { totalQuantity: -1 } } // Sort by most purchased
    ]);

    res.json(itemsPurchased);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching purchase data' });
  }
});

app.get('/api/sales/pie', async (req, res) => {
  try {
    const items = await createOrders.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.itemName",
          totalQuantity: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example API route for fetching finished products
app.get('/api/finished-products', async (req, res) => {
  try {
    const finishedProducts = await Item.find();
    res.status(200).json(finishedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching finished products' });
  }
});





const port = process.env.PORT||8090;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
