// material
import { Grid, Container } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
  BookingTotal,
  BookingCheckIn,
  BookingCheckOut,
  BookingRoomAvailable,
  BookingCheckInWidgets,
  BookingReservationStats,
} from '../../components/_dashboard/general-booking';
import BookingLienHeChuaMua from 'src/components/_dashboard/general-booking/BookingLienHeChuaMua';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Thống kê | Delta">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={3}>
            <BookingTotal />
          </Grid>
          {/* Đã bán */}
          <Grid item xs={12} md={3}>
            <BookingCheckIn />
          </Grid>
          {/* Chưa liên hệ */}
          <Grid item xs={12} md={3}>
            <BookingCheckOut />
          </Grid>

          <Grid item xs={12} md={3}>
            <BookingLienHeChuaMua />
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <BookingRoomAvailable />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingRoomAvailable />
              </Grid> */}

            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <BookingReservationStats />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
