import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Divider, Tooltip
} from '@mui/material';
import {
  Home, Login, PersonAdd, AdminPanelSettings,
  Category, Logout
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useFilter } from '../context/FilterContext';
import { apiService } from '../api/apiService';

const drawerWidth = 260;
const closedWidth = 70;

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { selectedCategory, setSelectedCategory } = useFilter();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Categories could not be loaded.", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigate('/');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',
          color: 'white',
          borderRight: '1px solid #333',
          overflowX: 'hidden',
          width: isOpen ? drawerWidth : closedWidth,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap',
          boxShadow: isOpen ? 10 : 0,
          zIndex: 1200
        }
      }}
    >
      {/* LOGO */}
      <Box sx={{ height: 64, display: 'flex', alignItems: 'center', pl: isOpen ? 2 : 1, pr: isOpen ? 2 : 1, bgcolor: '#1976d2', color: 'white', transition: '0.3s' }}>
        <Box
          component="img"
          src="/logo.png"
          alt="pydEcom Logo"
          sx={{
            height: isOpen ? 48 : 40,
            width: isOpen ? 48 : 40,
            borderRadius: '50%',
            mr: isOpen ? 2 : 0,
            transition: 'all 0.3s',
          }}
        />
        <Box sx={{ opacity: isOpen ? 1 : 0, display: isOpen ? 'block' : 'none', transition: 'opacity 0.3s' }}>
          <Typography variant="h6" fontWeight="bold">pydEcom</Typography>
        </Box>
      </Box>

      <Divider sx={{ bgcolor: '#333' }} />

      <List sx={{ pt: 2, flexGrow: 1 }}>
        
        {/* --- HOME PAGE --- */}
        <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
          <Tooltip title={!isOpen ? "Home Page" : ""} placement="right">
            <ListItemButton
              component={Link}
              to="/"
              onClick={() => setSelectedCategory('All')}
              selected={isActive('/') && selectedCategory === 'All'}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
                '&.Mui-selected': { bgcolor: '#1976d2' },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: 'white' }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home Page" sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </ListItem>

        {/* --- CATEGORIES --- */}
        {isOpen && (
          <Box sx={{ px: 3, mt: 2, mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'gray', fontWeight: 'bold', fontSize: '0.75rem' }}>
              CATEGORIES
            </Typography>
          </Box>
        )}

        <List component="div" disablePadding>
          {categories.map((cat) => (
            <ListItem key={cat.id} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!isOpen ? cat.name : ""} placement="right">
                <ListItemButton
                  onClick={() => handleCategoryClick(cat.id)}
                  selected={selectedCategory === cat.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                    pl: isOpen ? 4 : 2.5,
                    '&.Mui-selected': { bgcolor: 'rgba(25, 118, 210, 0.2)', borderRight: '4px solid #1976d2' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: '#ccc' }}>
                    <Category fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={cat.name} sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        {/* --- JUST ADMINS --- */}
        {user?.role === 'ADMIN' && (
          <>
             {isOpen && <Divider sx={{ my: 1, borderColor: '#333' }} />}
             <ListItem disablePadding sx={{ display: 'block', mt: 1 }}>
              <Tooltip title={!isOpen ? "Admin Panel" : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to="/admin"
                  selected={isActive('/admin')}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                    '&.Mui-selected': { bgcolor: '#d32f2f' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: '#ff5252' }}>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}
      </List>

      {/* LOGIN / REGISTER / LOGOUT  */}
      <Box sx={{ pb: 2 }}>
        <Divider sx={{ bgcolor: '#333', mb: 2 }} />

        {user ? (
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!isOpen ? "Logout" : ""} placement="right">
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': { bgcolor: 'rgba(220, 0, 78, 0.2)' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: '#f48fb1' }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  secondary={user.username} 
                  secondaryTypographyProps={{ fontSize: '0.7rem', color: '#aaa' }}
                  sx={{ opacity: isOpen ? 1 : 0 }} 
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!isOpen ? "Login" : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to="/login"
                  selected={isActive('/login')}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: '#90caf9' }}>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="Login" sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title={!isOpen ? "Register" : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to="/register"
                  selected={isActive('/register')}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 3 : 'auto', justifyContent: 'center', color: '#a5d6a7' }}>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Register" sx={{ opacity: isOpen ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}
      </Box>
    </Drawer>
  );
};