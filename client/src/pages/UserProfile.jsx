import React from 'react';
import './UserProfile.css';
import Head from '../common/header/Head';
import Footer from '../common/footer/Footer';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function UserProfile() {
  // const PF = 'http://localhost:5000/profile_pic/';

  // const [first_name, setFirstName] = useState('');
  // const [last_name, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [mobile_number, setMobile] = useState('');
  // const [profile_pic, setProfile] = useState(' ');

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   setFirstName(user?.first_name);
  //   setLastName(user?.last_name);
  //   setEmail(user?.email);
  //   setMobile(user?.mobile_number);
  //   setProfile(user?.profile_pic);
  // }, []);

  return (
    <div className="profile">
      <Head />
      <div className="container d-flex justify-content-center">
        <Card className="card-user p-3 py-4" variant="outlined">
          <CardContent>
            <div className="text-center">
              <Typography variant="h5" className="text-dark mt-2">
                User Profile
              </Typography>
              <br />
              <img
                src="./assets/images/avatars/avatar_1.jpg"
                width="200"
                className="rounded-circle"
                alt="profile"
              />
              <br />
              <br />
              <Typography variant="h6" className="text-dark mt-2">
                Dilini Sandalika
              </Typography>
              <Typography variant="h6" className="text-dark mt-2">
                sandalika@gmail.com
              </Typography>
              <Typography variant="h6" className="text-dark mt-2">
                0775423658
              </Typography>
              <div className="social-buttons mt-5">
                <button className="neo-button">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="neo-button">
                  <i className="fab fa-whatsapp"></i>
                </button>
                <button className="neo-button">
                  <i className="fab fa-google"></i>
                </button>
                <button className="neo-button">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
              <div className="profile mt-5">
                <button className="profile_button px-5">Edit profile</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
