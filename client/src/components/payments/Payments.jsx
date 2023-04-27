import * as React from 'react';
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import backgrounImage from "../../assets/images/payportback.jpg";
// import { ENDPOINTS, createAPIEndpoint } from '../../api';
import DeleteIcon from '@mui/icons-material/Delete';
import PaidIcon from '@mui/icons-material/Paid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';

// const styles = {
//   header: {
//     backgroundImage: `url(${backgrounImage})`,
//     height: "100vh",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//   },

//   content: {
//     height: "100%",
//     width: "100%",
//     backgroundColor: "rgba(255, 255, 255, 0.5)",
//   },
// };

function Payments() {
  const [payments, setPayments] = React.useState();
  const [currentPayment, setCurrentPayment] = React.useState();

  // React.useEffect(() => {
  //   createAPIEndpoint(ENDPOINTS.payment)
  //     .fetch()
  //     .then((res) => {
  //       setPayments(res.data);
  //       setCurrentPayment(res.data[0]);
  //     });
  // }, []);
  // console.log(payments);

  // let navigate = useNavigate();
  // const onClick = () => {
  //   navigate('pay');
  // };

  // const deletePayment = (id) => {
  //   createAPIEndpoint(ENDPOINTS.payment).delete(id);
  //   window.location.reload();
  // };

  // const verifyPayment = (payment) => {
  //   payment['verified'] = true;
  //   createAPIEndpoint(ENDPOINTS.payment).put(payment._id, payment);
  //   window.location.reload();
  // };

  const setCurrentPay = (payment) => {
    setCurrentPayment(payment);
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}-${year.toString()}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  return (
    <>
      {/* <div style={styles.header}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
          style={styles.content}
        > */}
      <div>
        <Box>
          {payments === undefined ? (
            <CircularProgress />
          ) : (
            <Stack gap={4} direction={'column'}>
              <Typography variant="h3"> Received Payments </Typography>
              <Stack direction={'row'} spacing={5}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    backgroundColor: '#4A75D3',
                    borderRadius: 5,
                    color: 'white',
                    gap: 5,
                  }}
                >
                  {payments?.map((payment) => {
                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <IconButton
                              onClick={() => setCurrentPayment(payment)}
                              aria-label="delete"
                            >
                              <VisibilityIcon color="#4A75D3" />
                            </IconButton>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ bgcolor: payment.verified ? 'blue' : 'red' }}
                          >
                            <IconButton
                              disabled={payment.verified}
                              // onClick={() => verifyPayment(payment)}
                              aria-label="delete"
                            >
                              <VerifiedIcon
                                sx={{ color: 'white' }}
                                color="#4A75D3"
                              />
                            </IconButton>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'red' }}>
                            <IconButton
                              // onClick={() => deletePayment(payment._id)}
                              aria-label="delete"
                            >
                              <DeleteForeverIcon
                                sx={{ color: 'white' }}
                                color="#4A75D3"
                              />
                            </IconButton>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`ID: ${payment._id}`}
                          secondary={formatDate(payment.dateTime)}
                        />
                        <Divider />
                      </ListItem>
                    );
                  })}
                </List>
                <Box sx={{ bgcolor: 'white', padding: 5, borderRadius: 5 }}>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      Payment ID : {currentPayment?._id}
                    </Typography>
                    <Typography variant="h6">
                      Payment Amount : LKR {currentPayment?.amount}
                    </Typography>
                    <Typography variant="h6">
                      Payment Address : {currentPayment?.address}
                    </Typography>
                    <Typography variant="h6">
                      Email: {currentPayment?.email}
                    </Typography>
                    <Typography variant="h6">
                      NIC or Passport : {currentPayment?.nicOrPassport}
                    </Typography>
                    <Typography variant="h6">
                      Paid Via : {currentPayment?.paidVia}
                    </Typography>
                    <Typography variant="h6">
                      Payers Name : {currentPayment?.payersName}
                    </Typography>
                    <Typography variant="h6">
                      Purpose : {currentPayment?.purpose}
                    </Typography>
                    {currentPayment.verified ? (
                      <Chip
                        color="success"
                        icon={<VerifiedIcon sx={{ color: 'blue' }} />}
                        label="Verified"
                      />
                    ) : (
                      <Chip
                        color="error"
                        icon={<VerifiedIcon sx={{ color: 'blue' }} />}
                        label="Not Verified"
                      />
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          )}
        </Box>
      </div>
    </>
  );
}

export default Payments;
