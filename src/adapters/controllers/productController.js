const Product = require('../../domain/models/Product');

class ProductController {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
      res.redirect('/produtos');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const products = await Product.findAll();
      return products; // Retorna os produtos em vez de enviar a resposta
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async show(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.render('products/show', { product });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const [updated] = await Product.update(req.params.id, req.body);
      if (updated) {
        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Product.destroy({
        where: {
          id: req.params.id
        }
      });

      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new ProductController();
