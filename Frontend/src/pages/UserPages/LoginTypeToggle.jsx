import { ToggleButtonGroup, ToggleButton, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Custom styled ToggleButton
const BlackToggleButton = styled(ToggleButton)(({ selected }) => ({
  "&.Mui-selected": {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

const LoginTypeToggle = ({ loginType, setLoginType }) => {
  const navigate = useNavigate();

  const handleLoginTypeChange = (event, newType) => {
    if (newType !== null) {
      setLoginType(newType);
      navigate(newType === "user" ? "/login" : "/captainlogin");
    }
  };

  return (
    <>
      <InputLabel>Sign in as </InputLabel>
      <ToggleButtonGroup
        color="primary"
        value={loginType}
        exclusive
        onChange={handleLoginTypeChange}
        fullWidth
        className="mb-4"
      >
        <BlackToggleButton value="user" className="w-1/2">
          User
        </BlackToggleButton>
        <BlackToggleButton value="captain" className="w-1/2">
          Captain
        </BlackToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default LoginTypeToggle;