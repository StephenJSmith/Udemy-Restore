import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

type Props = {
  filtersData: {
    brands: string[];
    types: string[];
  }
}

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price: High to low' },
  { value: 'price', label: 'Price: Low to high' },
];

const Filters = ({filtersData: data}: Props) => {
  const { orderBy, types, brands } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Paper>
        <Search />
      </Paper>
      
      <Paper sx={{p: 3}}>
        <RadioButtonGroup 
          selectedValue={orderBy}
          options={sortOptions} 
          onChange={e => dispatch(setOrderBy(e.target.value))} 
        />
      </Paper>

      <Paper sx={{p: 3}}>
        <CheckboxButtons 
          items={data.brands} 
          checked={brands} 
          onChange={items => dispatch(setBrands(items))}
        />
      </Paper>

      <Paper sx={{p: 3}}>
      <CheckboxButtons 
          items={data.types} 
          checked={types} 
          onChange={items => dispatch(setTypes(items))}
        />
      </Paper>

      <Button onClick={() => dispatch(resetParams())} >Reset Filters</Button>
    </Box>
  )
}

export default Filters;