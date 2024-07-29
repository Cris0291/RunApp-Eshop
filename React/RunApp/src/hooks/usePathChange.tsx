import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePathChange(): string {
  let location = useLocation();
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return path;
}

export default usePathChange;
