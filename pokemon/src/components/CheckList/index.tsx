import { memo, use } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { CardsDispatchContext } from "../../contexts";
import { CARDS_ACTIONS, IFilterState } from "../../stores";

interface CheckListProps {
  list: string[];
  keyFilter: keyof IFilterState;
}

const CheckList = ({ keyFilter, list }: CheckListProps) => {
  const dispatch = use(CardsDispatchContext);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (event.target.checked) {
      dispatch({
        type: CARDS_ACTIONS.ADD_FILTER_VALUE,
        filterKey: keyFilter,
        value,
      });
    } else {
      dispatch({
        type: CARDS_ACTIONS.REMOVE_FILTER_VALUE,
        filterKey: keyFilter,
        value,
      });
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
