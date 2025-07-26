//chage id to _id
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Add Razorpay type to window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { items: cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  const DELIVERY_CHARGE = 50;
  const MIN_ORDER_AMOUNT = 300;
  const subtotal = totalPrice;
  const shipping = subtotal > MIN_ORDER_AMOUNT ? 0 : DELIVERY_CHARGE;
  const total = subtotal + shipping;

  const ApiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const RazorpayKey = import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID;

  // Debug logging for environment variables
  console.log("ApiUrl:", ApiUrl);
  console.log("RazorpayKey:", RazorpayKey);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (formData: { name: string; email: string; phone: string; address: string }) => {
    setError("");
    setLoading(true);
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setError("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${ApiUrl}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      });
      // Debug logging for order creation response
      console.log("Order creation response status:", response.status);
      const responseText = await response.clone().text();
      console.log("Order creation response:", responseText);
      if (!response.ok) {
        type ErrorData = { message?: string };
        let errorData: ErrorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          // response body is empty or not JSON
        }
        setError(errorData.message || "Failed to create order.");
        setLoading(false);
        return;
      }
      const { order } = JSON.parse(responseText);
      const options = {
        key: RazorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "McKhana",
        description: "Complete your purchase",
        order_id: order.id,
        handler: async (razorpayResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const verifyResponse = await fetch(`${ApiUrl}/payments/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              name: formData.name,
              email: formData.email,
              phoneNo: formData.phone,
              address: formData.address,
              products: cartItems.map((item) => ({
                productId: item._id, 
                name: item.name,
                quantity: item.quantity,
              })),
              total,
            }),
          });
          if (verifyResponse.ok) {
            const data = await verifyResponse.json();
            clearCart();
            navigate(`/success/${data.order.razorpay_order_id}`, { state: { orderDetails: data } });
          } else {
            type ErrorData = { message?: string };
            let errorData: ErrorData = {};
            try {
              errorData = await verifyResponse.json();
            } catch {
              // response body is empty or not JSON
            }
            setError(errorData.message || "Payment verification failed.");
          }
          setLoading(false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty.",
        variant: "destructive",
      });
      return;
    }

    await handlePayment(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{item.weight}</Badge>
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              {cartItems.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
              )}
              {cartItems.length > 0 && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Add ₹{DELIVERY_CHARGE - subtotal} more for free shipping
                    </p>
                  )}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+91|0)?[6-9]\d{9}$/,
                          message: "Enter a valid Indian phone number (e.g., +919876543210 or 09876543210).",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={cartItems.length === 0 || loading}
                  >
                    {loading ? "Processing..." : `Place Order - ₹${total}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
