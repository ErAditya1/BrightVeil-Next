// components/RazorpayCheckout.tsx
'use client'
import api from '@/api';
import { toast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react';

const RazorpayCheckout = () => {


    useEffect(() => {
        if (typeof window !== 'undefined' && !window.Razorpay) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => console.log('Razorpay script loaded');
          document.body.appendChild(script);
        }
      }, []);

    const [amount, setAmount] = useState<number>(500); // default amount in INR

    const handlePayment = async () => {
        // 1. Create an order on the backend
        const res = await api.post('/v1/payment/create-order', { amount: amount })
            .then((res) => {
                console.log(res);
                const order = res.data.data;
                if (typeof window !== 'undefined' && window.Razorpay) {
                    const options: any = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: order.amount,
                        currency: 'INR',
                        name: 'Your Company',
                        description: 'Test Transaction',
                        order_id: order.id,
                        handler: function (response: any) {
                            alert('Payment Successful');
                            console.log(response);
                        },
                        prefill: {
                            name: 'John Doe',
                            email: 'john.doe@example.com',
                            contact: '9876543210',
                        },
                        theme: {
                            color: '#F37254',
                        },
                    };


                    const rzp1 = new (window as any).Razorpay(options);
                    rzp1.open();
                }
                else {
                    console.error('Razorpay library is not loaded!');
                }

            })
            .catch(err => {
                console.log(err);
                toast({
                    title: 'Payment Failed!',
                    description: err?.response?.data?.message,
                    variant: 'destructive',
                })
            });



    };

    return (
        <div>
            <h2>Razorpay Payment</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount in INR"
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default RazorpayCheckout;
