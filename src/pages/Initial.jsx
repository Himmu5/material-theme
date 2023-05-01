import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Initial() {
  const { isLoggedIn } = useSelector((state) => state.adminAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin-login');
    else navigate('/dashboard/users');
  }, []);
}

export default Initial;
