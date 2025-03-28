import { memo, use, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { CardsDispatchContext, FilterHPContext } from "../../contexts";
import { CARDS_ACTIONS } from "../../stores";

const FormSearchHP = () => {
  const hpRange = use(FilterHPContext);
  const [from, setFrom] = useState<number | undefined>(hpRange[0] || undefined);
  const [to, setTo] = useState<number | undefined>(hpRange[1] || undefined);
  const [error, setError] = useState(false);
  const dispatch = use(CardsDispatchContext);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number | undefined>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setter(Number(value));
        setError(false);
      }
    };

  const handleApplyHP = () => {
    const fromNum = Number(from || 0);
    const toNum = Number(to || 0);

    if (fromNum > toNum) {
      setError(true);
    } else {
      setError(false);
      if (fromNum !== hpRange[0] || toNum !== hpRange[1]) {
        dispatch({
          type: CARDS_ACTIONS.SET_HP_RANGE,
          hpFrom: fromNum,
          hpTo: toNum,
        });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb="12px">
        HP
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput
            placeholder="From"
            value={from !== undefined ? from : ""}
            type="text"
            onChange={handleChange(setFrom)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{
              borderColor: error ? "red" : "inherit",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: error ? "red" : "inherit",
              },
            }}
          />
        </FormControl>
        <Typography>-</Typography>
        <FormControl sx={{ maxWidth: "90px" }}>
          <OutlinedInput
            placeholder="To"
            value={to !== undefined ? to : ""}
            type="text"
            onChange={handleChange(setTo)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{
              borderColor: "inherit",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "inherit",
              },
            }}
          />
        </FormControl>
      </Box>
      {error && (
        <Typography color="red" fontSize="14px">
          "From" value cannot be greater than "To"!
        </Typography>
      )}

      <Button
        variant="contained"
        sx={{ width: "100%", mt: "20px" }}
        disabled={from === undefined || to === undefined}
        onClick={handleApplyHP}
      >
        Apply HP
      </Button>
    </Box>
  );
};

export default memo(FormSearchHP);
