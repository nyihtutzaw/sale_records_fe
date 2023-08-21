import { TableViewOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import * as React from 'react';
import CustomerList from './pages/customer/CustomerList';
import CreateCustomer from './pages/customer/CreateCustomer';
import EditCustomer from './pages/customer/EditCustomer';
import ProductList from './pages/product/ProductList';
import CreateProduct from './pages/product/CreateProduct';
import EditProduct from './pages/product/EditProduct';
import SaleRecordList from './pages/saleRecord/SaleRecordList';
import CreateSaleRecord from './pages/saleRecord/CreateSaleRecord';

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
  // {
  //   icon: <DashboardIcon />,
  //   name: 'Dummy Page',
  //   path: 'dummy',
  //   layout: '/',
  //   component: DummyPage
  // },
  // {
  //   icon: <DashboardIcon />,
  //   name: 'Sample Page',
  //   path: 'sample',
  //   layout: '/',
  //   component: SamplePage,
  //   invisible: true
  // },
  // {
  //   icon: <InboxIcon />,
  //   name: 'Collapse' ,
  //   collapse: true,
  //   layout: '/',
  //   view: [
  //     {
  //       icon: <TableViewOutlined />,
  //       name: 'Form',
  //       path: 'form',
  //       layout: '/',
  //       component: FormPage
  //     },
  //     {
  //       icon: <TableViewOutlined />,
  //       name: 'Table',
  //       path: 'table',
  //       layout: '/',
  //       component: TablePage
  //     },
  //     {
  //       icon: <InsertDriveFileIcon />,
  //       name: 'Modal',
  //       path: 'modal-box',
  //       layout: '/',
  //       component: ModalPage
  //     },
  //   ],
  // },
];
