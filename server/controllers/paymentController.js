const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Order
exports.createOrder = async (req, res) => {
  const amount = Number(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount." });
  }

  try {
    const options = {
      amount: Math.ceil(amount),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Could not create Razorpay order.", error: error.message });
  }
};


exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    phoneNo,
    address,
    products,
    total,
  } = req.body;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature." });
    }

    const order = new Order({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      address,
      phoneNo,
      products,
      total,
    });

    // Attempt to send email and handle failure gracefully
    let emailSent = false;
    try {
      await sendEmail(name, total, razorpay_order_id, email);
      emailSent = true;
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error.message);
    }

    await order.save();

    if (emailSent) {
      res.status(200).json({
        message: "Payment verified and order created successfully. A confirmation email has been sent.",
        order,
      });
    } else {
      res.status(200).json({
        message: "Payment verified and order created successfully. However, we could not send a confirmation email. Please check your email address and try again.",
        order,
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Payment verification failed.", error: error.message });
  }
};

function sendEmail(name, total, razorpay_order_id, email) {

  let Url=process.env.FrontEnd_URL;
  return new Promise((resolve, reject) => {
    // Simple email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      reject(new Error(`Invalid email format: ${email}`)); // Reject if email is invalid
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your Order Confirmation – Thank You for Shopping with Us!",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #4CAF50; text-align: center;">Thank You for Your Order, ${name}!</h2>
      <p>Hello ${name},</p>
      <p>We are excited to let you know that your order has been successfully placed.</p>
      <p><strong>Order Number:</strong> ${razorpay_order_id}<br>
      <strong>Total Amount:</strong> ₹${total}</p>
      <p>You can view your order details and track the status using the link below:</p>
      <p style="text-align: center;">
        <a href="${Url}/success/${razorpay_order_id}" 
          style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          View Order Details
        </a>
      </p>
      <p>Thank you for shopping with us. We hope to serve you again soon!</p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #888; text-align: center;">
        This is an automated email. Please do not reply.
      </p>
    </div>
  `,
};


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new Error(`Failed to send email to ${email}: ${error.message}`)); // Reject on error
      } else {
        resolve(info); // Resolve if email is sent successfully
      }
    });
  });
}



// Verify Payment
// exports.verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     name,
//     email,
//     phoneNo,
//     address,
//     products,
//     total,
//   } = req.body;

//   try {
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature." });
//     }

//     const order = new Order({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       name,
//       email,
//       address,
//       phoneNo,
//       products,
//       total,
//     });

//     sendEmail(name, total, razorpay_order_id, email);

//     await order.save();

//     res.status(200).json({
//       message: "Payment verified and order created successfully.",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Payment verification failed.", error: error.message });
//   }
// };

// function sendEmail(name, total, razorpay_order_id, email) {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   console.log("first")

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Order Confirmation",
//     text: `Thank you for your order, ${name}! Your total is ₹${total} and your order no is ${razorpay_order_id}.`,
//   };
//    console.log("s")
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(`Failed to send email to ${email}:`, error.message);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }