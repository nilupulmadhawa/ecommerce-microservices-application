import { Box, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactPDF, {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
} from '@react-pdf/renderer';
import PdfGenerator from './PdfGenerator';
// import logo from "../../assets/images/logo.png";
import { useEffect } from 'react';
import BasicButton from '../../common/BasicButton';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

function PaymentSuccessful({ values }) {
  useEffect(() => {}, [values]);

  const Pdf = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          ~ Herbal World Online Payments ~
        </Text>
        <Text style={styles.author}>Payment For</Text>
        <Text style={styles.title}> {values.purpose} </Text>
        {/* <Image style={styles.image} src={logo} /> */}
        {/* <Text style={styles.subtitle}> TimeStamp : {values.dateTime} </Text> */}
      </Page>
    </Document>
  );

  let navigate = useNavigate();
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="100vh"
      >
        <Box
          display="flex"
          // justifyContent="center"
          alignItems="center"
          //   minHeight="100vh"
        >
          <Stack gap={2} direction={'column'}>
            <Typography variant="h4">Payment Successful</Typography>
            <Typography variant="h5">
              Congratulations ! Your payment was successfull
            </Typography>
            <Stack direction={'row'} gap={1}>
              <BasicButton
                text={'Email Me the Recipt'}
                width={250}
                backgroundColor={'secondary'}
              />
              <PDFDownloadLink document={<Pdf />} fileName="somename.pdf">
                <BasicButton
                  text={'Download the Reciept'}
                  width={250}
                  backgroundColor={'secondary'}
                />
              </PDFDownloadLink>
            </Stack>
            <Divider />
            <BasicButton
              onClick={() => {
                navigate('/paymentportal');
              }}
              text={'Back to Home'}
              width={150}
              backgroundColor={'primary'}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default PaymentSuccessful;
