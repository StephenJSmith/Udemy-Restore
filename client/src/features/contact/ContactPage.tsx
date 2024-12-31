import { decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

const ContactPage = () => {
  const {data} = useAppSelector(state =>state.counter);
  const dispatch = useAppDispatch();

  return (
<>
      <Typography variant="h2">Contact page</Typography>
      <Typography variant='body1'>
        The data is: {data}
      </Typography>
      <ButtonGroup>
      <Button onClick={() => dispatch(decrement(1))}>-</Button>
      <Button onClick={() => dispatch(increment(1))}>+</Button>
      <Button onClick={() => dispatch(increment(10))}>+10</Button>
      </ButtonGroup>
</>  
)
}

export default ContactPage;
