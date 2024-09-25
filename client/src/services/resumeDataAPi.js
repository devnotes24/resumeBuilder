
// import toast from 'react-hot-toast';
import api from './api';
// import axios from 'axios';

// import axios from "axios";

export async function getResumeData(email) {
  try {
    if(!email){
      // toast.error("Login to the account")
      return {}
    }
    const response = await api.post('regLoginRt/getUser', {"email":email});
    // console.log(email, "kjdgfjadifadfidfvs");
    if (response.data.error) {
      console.log('Resume Data fetching failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }

    console.log("this is the data ",response.data);
    return response;
  } catch (error) {
    console.error('There was an error in fetching the Resume data:', error);
    throw error; // Rethrow error to handle in the component
  }
}

// import axios from 'axios';
// import { toast } from 'react-toastify'; // Make sure to import toast if you're using it

// export async function getResumeData(email) {
//   try {
//     if (!email) {
//       toast.error("Login to the account");
//       return;
//     }

//     const response = await axios.get('https://resumebuilder-4ljd.onrender.com/regLoginRt/getUser', {
//       params: {
//         email: email, // Send the email as a query parameter
//       },
//     });

//     if (response.data.error) {
//       console.log('Resume Data fetching failed:', response.data.error);
//       throw new Error(response.data.error); // Throw error to handle in the component
//     }

//     console.log("This is the data", response.data);
//     return response.data; // Return only the data, not the whole response
//   } catch (error) {
//     console.error('There was an error in fetching the Resume data:', error);
//     throw error; // Rethrow error to handle in the component
//   }
// }



export async function updateResumeData(email , data) {
  try {
    // console.log("updating" , email , data);
    const response = await api.put('regLoginRt/updateUser', {"email":email,"data":[data]});

    if (response.data.error) {
      console.log('Rsume data update failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }

    return response;
  } catch (error) {
    console.error('There was an error in updating data:', error);
    throw error; // Rethrow error to handle in the component
  }
}




// export async function deleteChat(email) {
//     try {
//         const response = await api.delete('http://localhost:8000/chatRt/clearChat', {
//             data: { email } // Send email in the request body
//         });

//         if (response.data.error) {
//             console.log('Clearing the chat failed:', response.data.error);
//             throw new Error(response.data.error); // Throw error to handle in the component
//         }

//         return response; // Return the response data directly
//     } catch (error) {
//         console.error('There was an error in clearing the chat:', error);
//         throw error; // Rethrow error to handle in the component
//     }
// }




// export async function deleteChat(email ) {
//   try {

//     const response = await axios.delete('http://localhost:8000/chatRt/clearChat', {
//       email
//     });

//     if (response.data.error) {
//       console.log('clearing the chat failed:', response.data.error);
//       throw new Error(response.data.error); // Throw error to handle in the component
//     }

//     return response;
//   } catch (error) {
//     console.error('There was an error in claering the chat:', error);
//     throw error; // Rethrow error to handle in the component
//   }
// }
