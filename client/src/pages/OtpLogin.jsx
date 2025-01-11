import React, {useState} from 'react'
import Navbar from '../components/Navbar'

export default function OtpLogin() {

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const[yourOtp, setYourOtp] = useState('');
    
    const [isOtpSent, setIsOtpSent] = useState(false);


    const handleVerifyOtp = (e)=>{
        e.preventDefault();
        if(otp==yourOtp){
            console.log("otp verifyed successfully");
        }else{
            console.log("wrong otp");
        }


    }

    const handleSendOtp = (e)=>{
        e.preventDefault();
        let rand = Math.floor(Math.random()*10*(1000-101)+101);
        setYourOtp(rand);
        console.log(`api send to your ${mobile} number`);
        setIsOtpSent(true);


    }


  return (
    <div>
        <Navbar/>

        <div className=" mt-12  flex justify-center bg-white-200">
      <form
        onSubmit={isOtpSent ? handleVerifyOtp: handleSendOtp}
        className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
       <h2 className="text-xl font-semibold text-center text-gray-800">
          {isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </h2>
        {!isOtpSent && <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>}
        {
            isOtpSent && <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={yourOtp}

              className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        }
        
    
        <button
        type='submit'
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"

        >
            {isOtpSent? 'Verify OTP': "Send OTP"}
            
        </button>


      </form>
    </div>
    </div>
  )
}
