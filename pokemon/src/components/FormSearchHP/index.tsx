import { memo, use, useEffect, useState } from "react";
import { Box, FormControl, OutlinedInput, Typography } from "@mui/material";
import { CardsDispatchContext } from "../../contexts";

const FormSearchHP = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const dispatch = use(CardsDispatchContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (from !== "" && to !== "") {
        if (Number(from) > Number(to)) {
          setFrom(to);
        } else {
          dispatch({ type: "SET_HP_RANGE", hpFrom: from, hpTo: to });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [from, to, dispatch]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setter(value);
      }
    };

  useEffect(() => {
    if ((from !== "" && to === "") || (from === "" && to !== "")) {
      const timeout = setTimeout(() => {
        setFrom("");
        setTo("");
        dispatch({ type: "SET_HP_RANGE", hpFrom: "", hpTo: "" });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [from, to, dispatch]);

  useEffect(() => {
    if (from === "" && to === "") {
      dispatch({ type: "SET_HP_RANGE", hpFrom: "", hpTo: "" });
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
