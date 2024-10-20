import { Request } from '$root/entities/index';
import { sequelize } from '$root/sequelize';

// Middleware function to start a transaction
export const transactionMiddleware = async (req: Request, res, next) => {
  const transaction = await sequelize.transaction();
  req.transaction = transaction; // Attach transaction to request object
  next();
};

// Middleware function to commit or rollback the transaction
export const transactionHandlerMiddleware = async (req, res, next) => {
  const { transaction } = req;
  try {
    await transaction.commit();
    res.status(201).json({ user: res.locals.user });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
