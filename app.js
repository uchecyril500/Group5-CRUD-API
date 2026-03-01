require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const products = [
  { id: 1, name: 'shoe', price: 10 },
  { id: 2, name: 'bag', price: 20 },
  { id: 3, name: 'watch', price: 30 },
];

// end point for listing products
app.get('/products', (req, res) => {
  res.send(products);
})

// end point for Adding a product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
})

// End point for Editing the product

app.patch( '/products/:id', (req, res) => {
    const product = products.find(t => t.id === parseInt(req.params.id)); //find array
    if (!product) return res.status(404).json({message: 'Todo not found'})
    Object.assign(product, req.body)
    res.status(200).json(product)
})

// end point for removing products
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(t => t.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({message: "Product not found"})
  products.splice(productIndex, 1);
  res.status(204).json({message:"Product deleted Successfully"}); 
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})