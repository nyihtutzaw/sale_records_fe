import { TableViewOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import * as React from 'react';
import CustomerList from './pages/customer/CustomerList';
import CreateCustomer from './pages/customer/CreateCustomer';
import EditCustomer from './pages/customer/EditCustomer';
import ProductList from './pages/product/ProductList';
import CreateProduct from './pages/product/CreateProduct';
import EditProduct from './pages/product/EditProduct';
import PaymentMethodList from './pages/paymentMethod/PaymentMethodList';
import CreatePaymentMethod from './pages/paymentMethod/CreatePaymentMethod';
import EditPaymentMethod from './pages/paymentMethod/EditPaymentMethod';
import SaleRecordList from './pages/saleRecord/SaleRecordList';
import CreateSaleRecord from './pages/saleRecord/CreateSaleRecord';
import AdminList from './pages/admin/AdminList';
import CreateAdmin from './pages/admin/CreateAdmin';
import EditAdmin from './pages/admin/EditAdmin';
import InvoiceSetting from './pages/invoice_setting/InvoiceSetting';

export const routes = [
  {
    icon: <DashboardIcon />,
    name: 'Sale Screen',
    path: '',
    component: CreateSaleRecord,
    layout: '/',
  },
  {
    icon: <TableViewOutlined />,
    name: 'Admin',
    path: 'admin',
    layout: '/',
    component: AdminList,
  },
  {
    name: 'Create Admin',
    path: '/admin-create',
    component: CreateAdmin,
    invisible: true,
    layout: '/',
  },
  {
    name: 'Edit Admin',
    path: '/admin-edit/:id',
    component: EditAdmin,
    invisible: true,
    layout: '/',
  },
  {
    icon: <TableViewOutlined />,
    name: 'Customer',
    path: 'customer',
    layout: '/',
    component: CustomerList,
  },
  {
    name: 'Create Customer',
    path: '/customer-create',
    component: CreateCustomer,
    invisible: true,
    layout: '/',
  },
  {
    name: 'Edit Product',
    path: '/customer-edit/:id',
    component: EditCustomer,
    invisible: true,
    layout: '/',
  },
  {
    icon: <TableViewOutlined />,
    name: 'Product',
    path: 'product',
    layout: '/',
    component: ProductList,
  },
  {
    name: 'Create Product',
    path: '/product-create',
    component: CreateProduct,
    invisible: true,
    layout: '/',
  },
  {
    name: 'Edit Product',
    path: '/product-edit/:id',
    component: EditProduct,
    invisible: true,
    layout: '/',
  },
  {
    name: 'Create payment-method',
    path: '/payment-method-create',
    component: CreatePaymentMethod,
    invisible: true,
    layout: '/',
  },
  {
    name: 'Edit Payment method',
    path: '/payment-method-edit/:id',
    component: EditPaymentMethod,
    invisible: true,
    layout: '/',
  },
  // {
  //   icon: <TableViewOutlined />,
  //   name: 'Payment Method',
  //   path: 'payment-method',
  //   layout: '/',
  //   component: PaymentMethodList,
  // },
  {
    name: 'Create payment-method',
    path: '/payment-method-create',
    component: CreatePaymentMethod,
    invisible: true,
    layout: '/',
  },
 
  {
    icon: <TableViewOutlined />,
    name: 'Sale Record',
    collapse: true,
    layout: '/',
    view: [
      {
        icon: <TableViewOutlined />,
        name: 'List',
        path: 'sale-record-list',
        layout: '/',
        component: SaleRecordList,
      },
    
    ],
  },
  {
    icon: <TableViewOutlined />,
    name: 'Setting',
    collapse: true,
    layout: '/',
    view: [
      {
        icon: <TableViewOutlined />,
        name: 'Payment Method',
        path: 'payment-method',
        layout: '/',
        component: PaymentMethodList,
      },
      {
        icon: <SettingsApplicationsIcon />,
        name: 'Invoice Setting',
        path: 'invoice-setting',
        component: InvoiceSetting,
        layout: '/',
      },
    
    ],
  },
];
