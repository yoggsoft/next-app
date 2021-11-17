import {
  Paper,
  Typography,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  Button
} from "@mui/material";
import { formatDateByHour } from "../../utils";
import { Company } from "../../types"
import Block from "../Block";

interface ICompanyColumn {
  company: Company
}

const gridProps = {
  minHeight: 500,
  width: 200,
  padding: 1,
  margin: 1
};

export default function CompanyColumn ({ company: { id, name, time_slots, type} }: ICompanyColumn) {
  return (
    <Grid sx={gridProps} component={Paper}>
      <Block>
        <Avatar sx={{marginRight: 1 }}>{id}</Avatar>
        <Typography>{name}</Typography>
      </Block>
      <div>
        <List sx={{ maxHeight:450, overflowY: 'scroll'}}>
          {
            time_slots.map((e,i) => {
              return (
                <Button fullWidth>
                {
                  `${formatDateByHour(e.start_time)} - ${formatDateByHour(e.end_time)}`
                }
                </Button>
              );
            })
          }
        </List>
      </div>
      <Divider />
    </Grid>
  );
}