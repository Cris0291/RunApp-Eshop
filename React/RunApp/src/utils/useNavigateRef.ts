import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export function useNavigateRef() {
  const navigateRrf = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigateRrf.current = navigate;
  }, [navigate]);

  return navigateRrf;
}
