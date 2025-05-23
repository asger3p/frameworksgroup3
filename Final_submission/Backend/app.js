import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './router/indexRouter.js';
import customersRouter from './router/customersRouter.js';
import productRouter from './router/productsRouter.js';
import basketRouter from './router/basketRouter.js';
import categoryRouter from './router/categoriesRouter.js';


const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(process.cwd(), 'views')); 
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/products', productRouter);
app.use('/basket', basketRouter);
app.use('/categories', categoryRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

export default app;