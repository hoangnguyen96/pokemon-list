import { memo, use } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { CardsDispatchContext } from "../../contexts";

const CheckList = ({ list }: { list: string[] }) => {
  const dispatch = use(CardsDispatchContext);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (event.target.checked) {
      dispatch({ type: "ADD_CHECK_LIST", value });
    } else {
      dispatch({ type: "REMOVE_CHECK_LIST", value });
    }
  };

  return (
    <FormGroup>
      {list.map((value) => (
        <FormControlLabel
          key={value}
          control={
            <Checkbox
              sx={{ p: "6px" }}
              onChange={(e) => handleClick(e, value)}
            />
          }
          label={value}
        />
      ))}
    </FormGroup>
  );
};

export default memo(CheckList);
