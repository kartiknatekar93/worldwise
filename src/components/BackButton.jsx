import Button from "./Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const Navigate = useNavigate();
  return (
    <Button onClick={() => Navigate(-1)} type="back">
      &larr; back
    </Button>
  );
}

export default BackButton;
