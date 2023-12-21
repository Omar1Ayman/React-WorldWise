import { useSearchParams } from "react-router-dom";

export function useUrlPostion() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  return [lng, lat, setSearchParams];
}
