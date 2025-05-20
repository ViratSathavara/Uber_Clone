import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <CircularProgress size={60} color="primary" />
    </div>
  );
};

export default Loader;