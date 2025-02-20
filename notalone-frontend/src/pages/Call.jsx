import { useLocation } from "react-router";
import CallerScreen from "./CallerScreen";
import CalleeScreen from "./CalleeScreen";

const Call = () => {
  const location = useLocation();
  const state_data = location.state;
  const peer = state_data?.pid;
  const role = state_data?.role;

  return role === "caller" ? (
    <CallerScreen peer={peer} role={role} />
  ) : (
    <CalleeScreen peer={peer} role={role} />
  );
};

export default Call;
