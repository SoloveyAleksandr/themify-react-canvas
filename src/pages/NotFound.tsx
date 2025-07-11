import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Button } from "../components";
import '../styles/global.scss';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--background-color)',
      padding: 'var(--spacing-md)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>404</Typography>
        <Typography variant="h4" color="secondary" gutterBottom>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="secondary" style={{ marginBottom: 'var(--spacing-xl)' }}>
          Запрашиваемая страница не существует или была перемещена
        </Typography>
        <Link to="/">
          <Button variant="primary">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
