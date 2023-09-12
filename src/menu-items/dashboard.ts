// assets
import { DashboardOutlined, AuditOutlined, MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  AuditOutlined,
  MessageOutlined
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
    {
      id: 'message',
      title: 'message',
      type: 'item',
      url: '/message',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
