import { TableViewOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import * as React from 'react';
import Dashboard from './pages/Home';
import DummyPage from './pages/DummyPage';
import FormPage from './pages/Form';
import TablePage from './pages/Table';
import ModalPage from './pages/ModalPage';
import SamplePage from './pages/Sample';

export const routes = [
  {
    icon: <DashboardIcon />,
    name: 'Sample Page',
    path: '/sample',
    component: SamplePage,
    invisible: true,
    layout: '/auth',
  },
  {
    icon: <DashboardIcon />,
    name: 'Dashboard',
    path: '',
    component: Dashboard,
    layout: '/',
  },
  {
    icon: <DashboardIcon />,
    name: 'Dummy Page',
    path: 'dummy',
    layout: '/',
    component: DummyPage
  },
  {
    icon: <DashboardIcon />,
    name: 'Sample Page',
    path: 'sample',
    layout: '/',
    component: SamplePage,
    invisible: true
  },
  {
    icon: <InboxIcon />,
    name: 'Collapse' ,
    collapse: true,
    layout: '/',
    view: [
      {
        icon: <TableViewOutlined />,
        name: 'Form',
        path: 'form',
        layout: '/',
        component: FormPage
      },
      {
        icon: <TableViewOutlined />,
        name: 'Table',
        path: 'table',
        layout: '/',
        component: TablePage
      },
      {
        icon: <InsertDriveFileIcon />,
        name: 'Modal',
        path: 'modal-box',
        layout: '/',
        component: ModalPage
      },
    ],
  },
];
