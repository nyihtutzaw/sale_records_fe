import styled from 'styled-components';
import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Table } from '../../components/Table';
import useProfitReport from './useProfitReport';
import { Input } from '../../components/Input';
import { InputType } from '../../constants';
import { FormItem } from '../../components/FormItem';

function ProfitReport() {
  const { headers, loadData, data } = useProfitReport();
  const [dateRange, setDateRange] = useState({ start_date: '', end_date: '' });

  const handleDateRange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <div>
      <Grid container spacing={2} alignItems="center" paddingX={10}>
        <Grid item xs={12} sm={4}>
          <FormItem label="Date">
            <Input
              name="date"
              inputType={InputType.date}
              onChange={(value) => {
                handleDateRange('start_date', value);
              }}
            />
          </FormItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormItem label="Date">
            <Input
              name="date"
              inputType={InputType.date}
              onChange={(value) => {
                handleDateRange('end_date', value);
              }}
            />
          </FormItem>
        </Grid>
        <Grid item sm={4}>
          <Button
            color="success"
            variant="outlined"
            disabled={!dateRange?.start_date || !dateRange?.end_date}
            onClick={() => loadData(dateRange)}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      {data?.data?.length > 0 && (
        <div>
          <TableWrapper>
            <Typography
              sx={{
                textAlign: 'right',
                padding: '10px',
              }}
            >
              Total Profit : {data?.totalProfit}
            </Typography>
            <Table headers={headers} rows={data?.data} />
          </TableWrapper>
        </div>
      )}
    </div>
  );
}
export default ProfitReport;

const TableWrapper = styled.div`
  width: 100%;
`;
