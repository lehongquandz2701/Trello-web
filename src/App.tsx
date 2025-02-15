import Button from "@mui/material/Button";
import { ThreeDRotation } from "@mui/icons-material";
function App() {
  return (
    <>
      <ThreeDRotation />
      <div className="font-normal"> Hello world</div>
      <Button style={{ textTransform: "none" }} variant="contained">
        Hello world
      </Button>
    </>
  );
}

export default App;
