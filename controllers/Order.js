const Order = require('../models/Order');

exports.index = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    throw error;
  }
};

exports.findOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.status(500).json(orders);
  } catch (error) {
    throw error;
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    error.message = 'Something went wrong!';
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json('Order deleted');
  } catch (error) {
    throw error;
  }
};

exports.income = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (error) {
    throw error;
  }
};
