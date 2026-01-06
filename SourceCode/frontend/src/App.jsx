import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';
import { Sidebar } from './components/Sidebar';
// Navbar importunu SİLDİK
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CartDrawer } from './components/CartDrawer'; 
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AdminPage } from './pages/AdminPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f4f6f8' },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
});

const collapsedSidebarWidth = 70; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <FilterProvider>
          <CartProvider>
            <Router>
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                
              
                <Sidebar />

                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    ml: `${collapsedSidebarWidth}px`, 
                    width: `calc(100% - ${collapsedSidebarWidth}px)`,
                    transition: 'margin 0.3s'
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route 
                        path="/admin" 
                        element={
                          <PrivateRoute adminOnly>
                            <AdminPage />
                          </PrivateRoute>
                        } 
                      />
                    </Routes>
                  </Box>

                  <Footer />
                </Box>

                <ScrollToTop />
                <CartDrawer />
                
              </Box>
            </Router>
          </CartProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;