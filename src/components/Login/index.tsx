import { User2Icon } from 'lucide-react';

import { PageController, trackUserLoginEvent } from '@sitecore-search/react';

const Login = (): JSX.Element => {
  const handleChange = (e: { target: { value: string } }): void => {
    console.log(
      '[Login] ',
      e.target.value,
      PageController.getContext().getUserCustom(),
      PageController.getContext().getUser(),
    );
    // processLogin(e.target.value);
    // PageController.getContext().setUserGroups(['premium', 'associate']);
    // trackUserLoginEvent({
    // email: 'micser_001@example.com',
    // Optional. User's billing address
    // address: {
    //     address_line_1: '123 Main Street',
    //     address_line_2: 'apartment 123',
    //     state: 'CA',
    //     zip: '90210',
    //     country: 'USA',
    // },
    // Optional
    // gender: 'male',
    // groups: ['premium', 'associate'],
    // addn_attributes: {
    //     email_subscriber: 'True',
    //     preferred_colors: ['WHITE', 'RED'],
    //     sub_id: '4321',
    // }
    // });
  };
  return (
    <div className="flex items-center">
      <User2Icon className="text-gray-400 " />
      <input className="select cursor-pointer"></input>
    </div>
  );
};

export default Login;
