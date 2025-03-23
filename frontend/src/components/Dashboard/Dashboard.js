import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Grid, Paper, Box,Button } from '@mui/material';
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, Settings as SettingsIcon, AccountCircle, Menu as MenuIcon,Logout as LogoutIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css'; // Correct import for CSS module
import axiosInstance from '../../utils/axiosInstance';

const drawerWidth = 260; // Updated width

const Dashboard = () => {
  const location = useLocation();
  const { userName } = location.state || { userName: 'User' }; // Default username if not provided
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      // Call the /users/logout endpoint
      const response = await axiosInstance.post('http://localhost:8081/users/logout');
  
      if (response.status === 200) {
        // Remove JWT token from localStorage
        localStorage.removeItem('token');
  
        // Redirect to home page
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className={styles.dashboard}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1e1e1e' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography component="span" variant="h5" style={{ color: '#32CD32', fontWeight: 'bold' }}>&lt;</Typography>
            <Typography component="span" variant="h6">AlgoSphere</Typography>
            <Typography component="span" variant="h5" style={{ color: '#32CD32', fontWeight: 'bold' }}>/&gt;</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {userName}
                </Typography>
            </IconButton>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ color: '#FF6666' }}/>}
              sx={{ marginLeft: 4,color: '#FF6666' }}
            >
              Logout
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#2d2d2d', color: '#ffffff', overflowX: 'hidden' },
        }}
      >
        <Toolbar />
        <div className={styles.sidebar}>
          <List>
            <ListItem button component={Link} to="/dashboard/overview">
              <ListItemIcon>
                <DashboardIcon style={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard Overview" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/strategies">
              <ListItemIcon>
                <BarChartIcon style={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Trading Strategies" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/performance">
              <ListItemIcon>
                <BarChartIcon style={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Performance Metrics" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/settings">
              <ListItemIcon>
                <SettingsIcon style={{ color: '#ffffff' }} />
              </ListItemIcon>
              <ListItemText primary="Account Settings" />
            </ListItem>
          </List>
          <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon style={{ color: '#FF6666' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: '#FF6666' }}/>
            </ListItem>
          </Box>
        </div>
      </Drawer>
      <main className={styles.mainContent}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="strategies" element={<TradingStrategies />} />
            <Route path="performance" element={<PerformanceMetrics data={data} />} />
            <Route path="settings" element={<AccountSettings />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
};

const DashboardOverview = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4} lg={3}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#2d2d2d', color: '#ffffff' }}>
        <Typography variant="h6">Total Trades</Typography>
        <Typography variant="h4">1234</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#2d2d2d', color: '#ffffff' }}>
        <Typography variant="h6">Success Rate</Typography>
        <Typography variant="h4">75%</Typography>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: '#2d2d2d', color: '#ffffff' }}>
        <Typography variant="h6">Current Balance</Typography>
        <Typography variant="h4">$12,345</Typography>
      </Paper>
    </Grid>
  </Grid>
);

const TradingStrategies = () => (
  <div>
    <Typography variant="h4" gutterBottom>Trading Strategies</Typography>
    <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
      <Typography variant="h6">Strategy 1</Typography>
      <Typography>Status: Active</Typography>
      <Typography>Performance: +10%</Typography>
      <div>
        <button>Edit</button>
        <button>Delete</button>
        <button>Deactivate</button>
      </div>
    </Paper>
    <Paper sx={{ p: 2, mt: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
      <Typography variant="h6">Strategy 2</Typography>
      <Typography>Status: Inactive</Typography>
      <Typography>Performance: -5%</Typography>
      <div>
        <button>Edit</button>
        <button>Delete</button>
        <button>Activate</button>
      </div>
    </Paper>
  </div>
);

const PerformanceMetrics = ({ data }) => (
  <div>
    <Typography variant="h4" gutterBottom>Performance Metrics</Typography>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AccountSettings = () => (
  <div>
    <Typography variant="h4" gutterBottom>Account Settings</Typography>
    <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
      <Typography variant="h6">Personal Details</Typography>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <button>Update</button>
      </form>
    </Paper>
    <Paper sx={{ p: 2, mt: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
      <Typography variant="h6">Change Password</Typography>
      <form>
        <div>
          <label>Current Password:</label>
          <input type="password" />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" />
        </div>
        <button>Change Password</button>
      </form>
    </Paper>
  </div>
);

export default Dashboard;