import { memo, use, useEffect, useState } from "react";
import { Box, FormControl, OutlinedInput, Typography } from "@mui/material";
import { CardsDispatchContext } from "../../contexts";
import { CARDS_ACTIONS } from "../../stores";

const FormSearchHP = () => {
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const dispatch = use(CardsDispatchContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (from !== undefined && to !== undefined) {
        if (Number(from) > Number(to)) {
          setFrom(to);
        } else {
          dispatch({
            type: CARDS_ACTIONS.SET_HP_RANGE,
            hpFrom: from,
            hpTo: to,
          });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [from, to, dispatch]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setter(Number(value));
      }
    };

  useEffect(() => {
    if (
      (from !== undefined && to === undefined) ||
      (from === undefined && to !== undefined)
    ) {
      const timeout = setTimeout(() => {
        setFrom(0);
        setTo(0);
        dispatch({ type: CARDS_ACTIONS.SET_HP_RANGE, hpFrom: 0, hpTo: 0 });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [from, to, dispatch]);

  useEffect(() => {
    if (from === undefined && to === undefined) {
      dispatch({ type: CARDS_ACTIONS.SET_HP_RANGE, hpFrom: 0, hpTo: 0 });
    }
  }, [from, to, dispatch]);

  return (
    <Box>
      <Typography variant="h6" mb="12px">
        HP
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput
            placeholder="From"
            value={from}
            type="text"
            onChange={handleChange(setFrom)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </FormControl>
        <Typography>-</Typography>
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput
            placeholder="To"
            value={to}
            type="text"
            onChange={handleChange(setTo)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default memo(FormSearchHP);
