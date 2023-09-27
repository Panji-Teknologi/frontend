// assets
import { DashboardOutlined, AuditOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  AuditOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.AuditOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
