import Label from "components/Label/Label";
import React, { FC,useEffect, useState  } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { checkAuthentication, updateUser } from '../../api/axios';
import AuthChecker from 'hocs/AuthChecker';
import { Alert } from "shared/Alert/Alert"; 


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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isEmailNotAuthenticated, setIsEmailNotAuthenticated] = useState(false);

  useEffect(() => {
    console.log('useEffect is running...');
    const fetchUserDetails = async () => {
      try {
        const response = await checkAuthentication();
        const user = response.user;
        console.log(user);
        setIsEmailNotAuthenticated(user.confirmation_token !== null);
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

  const handleFieldChange = (field: string, value: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value !== undefined ? value : '',
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await updateUser(userDetails);
      if (response && response.message) {
        setSuccessMessage(response.message);
        setErrorMessage(null);
      } else {
        console.error('Unexpected response from the API:', response);
        setErrorMessage('An unexpected error occurred while updating the profile.');
        setSuccessMessage(null);
      }
    } catch (error: any) {
      console.error('Error updating user:', error);

      if (error.response && error.response.data && error.response.data.error && error.response.data.errors) {
        const errorTitle = error.response.data.error;
        const errorDetails = error.response.data.errors;
        setErrorMessage(`${errorTitle}: ${errorDetails}`);
      } else {
        setErrorMessage('Failed to update profile. Please try again.');
      }

      setSuccessMessage(null);
    }
  };


  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
    <Helmet>
      <title>Account || Booking React Template</title>
    </Helmet>
    <CommonLayout>
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Account information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {isEmailNotAuthenticated && (
          <Alert type="warning">
            Your email is not yet authenticated. Please check your email and confirm your account.
          </Alert>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Left Column */}
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
                  {/* ... (existing SVG path) */}
                </svg>
                <span className="mt-1 text-xs">Change Image</span>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {/* First Name */}
            <div>
              <Label>First Name</Label>
              <Input
                className="mt-1.5"
                value={userDetails.first_name || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, first_name: e.target.value });
                }}
              />
            </div>

            {/* Last Name */}
            <div>
              <Label>Last Name</Label>
              <Input
                className="mt-1.5"
                value={userDetails.last_name || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, last_name: e.target.value });
                }}
              />
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <Select className="mt-1.5">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>

            {/* Username */}
            <div>
              <Label>Username</Label>
              <Input className="mt-1.5" defaultValue="@eden_tuan" />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                value={userDetails.email || 'example@gmail.com'}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
              />
            </div>

            {/* Date of Birth */}
            <div className="max-w-lg">
              <Label>Date of birth</Label>
              <Input
                className="mt-1.5"
                type="date"
                value={userDetails.dob || '1990-07-22'}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, dob: e.target.value });
                }}
              />
            </div>

            {/* Address */}
            <div>
              <Label>Address</Label>
              <Input className="mt-1.5" defaultValue="New york, USA" />
            </div>

            {/* Phone Number */}
            <div>
              <Label>Phone number</Label>
              <Input
                className="mt-1.5"
                value={userDetails.whatsapp_number || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, whatsapp_number: e.target.value });
                }}
              />
            </div>

            {/* About You */}
            <div>
              <Label>About you</Label>
              <Textarea
                className="mt-1.5"
                value={userDetails.about_me || '...'}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, about_me: e.target.value });
                }}
              />
            </div>

            {/* Country of Origin */}
            <div>
              <Label>Country of Origin</Label>
              <Input
                className="mt-1.5"
                value={userDetails.country_of_origin || ''}
                onChange={(e) => {
                  handleFieldChange('country_of_origin', e.target.value);
                }}
              />
            </div>

            {/* Languages Spoken */}
            <div>
              <Label>Languages Spoken</Label>
              <Input
                className="mt-1.5"
                value={userDetails.languages_spoken || ''}
                onChange={(e) => {
                  handleFieldChange('languages_spoken', e.target.value);
                }}
              />
            </div>

            {/* Instagram */}
            <div>
              <Label>Instagram</Label>
              <Input
                className="mt-1.5"
                value={userDetails.instagram_handle || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, instagram_handle: e.target.value });
                }}
              />
            </div>

            {/* Twitter */}
            <div>
              <Label>Twitter</Label>
              <Input
                className="mt-1.5"
                value={userDetails.twitter_handle || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, twitter_handle: e.target.value });
                }}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <Label>LinkedIn</Label>
              <Input
                className="mt-1.5"
                value={userDetails.linkedin_handle || ''}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, linkedin_handle: e.target.value });
                }}
              />
            </div>

            <div className="col-span-2 pt-6">
              <ButtonPrimary onClick={handleSaveClick}>Update info</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  </div>
  );
};

// Wrap your AccountPage component with AuthChecker
const WrappedAccountPage: FC<AccountPageProps> = AuthChecker(AccountPage);

// Export the wrapped component
export default WrappedAccountPage;
