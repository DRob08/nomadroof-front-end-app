import Label from "components/Label/Label";
import React, { FC,useEffect, useState  } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { checkAuthentication } from '../../api/axios';


export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
  const [userDetails, setUserDetails] = useState({
    country_of_origin: '',
    first_name: '',
    last_name: '',
    whatsapp_number: '',
    languages_spoken: '',
    about_me: '',
    dob: '',
    instagram_handle: '',
    twitter_handle: '',
    linkedin_handle: '',
    email: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    console.log('useEffect is running...');
    const fetchUserDetails = async () => {
      try {
        const response = await checkAuthentication();
        const user = response.user;
        console.log(user);
        const isEmailNotAuthenticated = user.confirmation_token !== null;
        setUserEmail(user.email || '');

        setUserDetails({
          country_of_origin: user.country_of_origin || '',
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          whatsapp_number: user.whatsapp_number || '',
          languages_spoken: user.languages_spoken || '',
          about_me: user.about_me || '',
          dob: user.dob || '',
          instagram_handle: user.instagram_handle || '',
          twitter_handle: user.twitter_handle || '',
          linkedin_handle: user.linkedin_handle || '',
          email: user.email || '',
        });

        console.log('User email set:', user.email || '');
        console.log('User details set:', {
          country_of_origin: user.country_of_origin || '',
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          whatsapp_number: user.whatsapp_number || '',
          languages_spoken: user.languages_spoken || '',
          about_me: user.about_me || '',
          dob: user.dob || '',
          instagram_handle: user.instagram_handle || '',
          twitter_handle: user.twitter_handle || '',
          linkedin_handle: user.linkedin_handle || '',
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar sizeClass="w-32 h-32" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>First Name</Label>
              <Input
                className="mt-1.5"
                value={userDetails.first_name || ''}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    first_name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                className="mt-1.5"
                value={userDetails.last_name || ''}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    last_name: e.target.value,
                  });
                }}
              />
            </div>
              {/* ---- */}
              <div>
                <Label>Gender</Label>
                <Select className="mt-1.5">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              {/* ---- */}
              <div>
                <Label>Username</Label>
                <Input className="mt-1.5" defaultValue="@eden_tuan" />
              </div>
              {/* ---- */}
              <div>
                <Label>Email</Label>
                <Input
                  className="mt-1.5"
                  value={userDetails.email || 'example@gmail.com'}
                  onChange={(e) => {
                    // Handle changes if needed
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              {/* ---- */}
              <div className="max-w-lg">
                <Label>Date of birth</Label>
                <Input
                  className="mt-1.5"
                  type="date"
                  value={userDetails.dob || '1990-07-22'}  
                  onChange={(e) => {
                    // Handle changes if needed
                    setUserDetails({
                      ...userDetails,
                      dob: e.target.value,
                    });
                  }}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>Addess</Label>
                <Input className="mt-1.5" defaultValue="New york, USA" />
              </div>
              {/* ---- */}
              <div>
                <Label>Phone number</Label>
                <Input
                  className="mt-1.5"
                  value={userDetails.whatsapp_number || '003 888 232'} 
                  onChange={(e) => {
                    // Handle changes if needed
                    setUserDetails({
                      ...userDetails,
                      whatsapp_number: e.target.value,
                    });
                  }}
                />
              </div>
              {/* ---- */}
              <div>
                <Label>About you</Label>
                <Textarea
                  className="mt-1.5"
                  value={userDetails.about_me || '...'}  
                  onChange={(e) => {
                    // Handle changes if needed
                    setUserDetails({
                      ...userDetails,
                      about_me: e.target.value,
                    });
                  }}
                />
              </div>

              {/* ---- */}
        <div>
          <Label>Instagram</Label>
          <Input
            className="mt-1.5"
            value={userDetails.instagram_handle || ''}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                instagram_handle: e.target.value,
              });
            }}
          />
        </div>
        {/* ---- */}
        <div>
          <Label>Twitter</Label>
          <Input
            className="mt-1.5"
            value={userDetails.twitter_handle || ''}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                twitter_handle: e.target.value,
              });
            }}
          />
        </div>
        {/* ---- */}
        <div>
          <Label>LinkedIn</Label>
          <Input
            className="mt-1.5"
            value={userDetails.linkedin_handle || ''}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                linkedin_handle: e.target.value,
              });
            }}
          />
        </div>
              <div className="pt-2">
                <ButtonPrimary>Update info</ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
