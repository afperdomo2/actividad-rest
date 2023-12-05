const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customerModel');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!this.items) {
        return 0;
      }
      if (this.items.length <= 0) {
        return 0;
      }
      return this.items.reduce((total, { price, OrderProduct }) => {
        return total + price * OrderProduct.amount;
      }, 0);
    },
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    /**
     * 'orders' se conecta a la tabla de 'orders_products' con el through,
     * a traves de la relación: 'products.id' - 'orders_products.productId'.
     *
     * Luego, obtiene los los datos de 'products', por la relación:
     * 'orders_products.productId' - 'products.id'.
     */
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
