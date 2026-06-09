
import Styles from "./Map.module.css";
import { useNavigate,useSearchParams } from "react-router-dom";

function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const lat=searchParam.get("lat");
  const lng=searchParam.get("lng");
  const Navigate=useNavigate();
  return <div className={Styles.mapContainer} onClick={()=>Navigate("form")}>Map </div>;
}

export default Map;
