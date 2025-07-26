import axios from "axios";

const ApiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchOrderDetails = async (setOrder,setError,setLoading,order_id) => {
    try {
      const url=`${ApiUrl}/orders/success/${order_id}`;
       const response = await axios.get(
        url
      );
      setOrder(response.data);
       
    } catch (err) {
      setError("Failed to fetch order details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };