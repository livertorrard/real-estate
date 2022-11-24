import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  Stack,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../charts';
import { useEffect, useState } from 'react';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 106, height: 106 };

export default function BookingCheckInWidgets() {
  const [tong, setTong] = useState(0);
  const [daBan, setDaBan] = useState(0);
  const [daLienHe, setDaLienHe] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const _tong = await getData(API_BASE_URL + `/thongke/tong`);
        const _daBan = await getData(API_BASE_URL + `/thongke/daban`);
        const _daLienHe = await getData(API_BASE_URL + `/thongke/dalienhe`);
        setTong(_tong.data);
        setDaBan(_daBan.data)
        setDaLienHe(_daLienHe.data)
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const TOTAL_CHECK_IN = daBan[0]?.total;
  const TOTAL_CHECK_OUT = daLienHe[0]?.total;
  const phanTramDaBan = Number(daBan[0]?.total/tong[0]?.total)* 100
  const CHART_DATA_CHECK_IN = [phanTramDaBan.toFixed(2)];
  const phanTramDaLienHe = Number(daLienHe[0]?.total/tong[0]?.total)* 100
  const CHART_DATA_CHECK_OUT = [phanTramDaLienHe.toFixed(2)];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  const chartOptionsCheckOut = {
    ...chartOptionsCheckIn,
    colors: [theme.palette.chart.yellow[0]],
  };

  return (
    <Card>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            flexItem
          />
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ width: 1, py: 5 }}
        >
          <ReactApexChart
            type="radialBar"
            series={CHART_DATA_CHECK_IN}
            options={chartOptionsCheckIn}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_IN)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Đã bán
            </Typography>
          </div>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={3}
          sx={{ width: 1, py: 5 }}
        >
          <ReactApexChart
            type="radialBar"
            series={CHART_DATA_CHECK_OUT}
            options={chartOptionsCheckOut}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_OUT)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Đã liên hệ
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
