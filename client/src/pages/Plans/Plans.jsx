import React, { useEffect } from "react";

import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

import "./Plans.css";


const Plans =() =>{
    const cardsData = [
        {
          id: 1,
          type: 'basic',
          title: 'Silver Plan',
          description: 'Subscribe here to activate the silver plan',
          price: 100.00,
          mostPopular: false,
          data: ['Having more than 1 doubt per day?', 'Ask 5 questions per day!']
        },
        {
          id: 2,
          type: 'medium',
          title: 'Gold Plan',
          description: 'Subscribe here to activate the gold plan.',
          price: 1000.00,
          mostPopular: true,
          data: [`Still don't feel satisfied?`, 'Ask 10 questions per day!']
        }
    ];

    const currentUser = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate(); 
    useEffect(() => {
        currentUser === null && navigate("/auth")
      },[currentUser, navigate]);
    return (
        <div className="app-wrapper">
            
             
            {cardsData.map((user) => (
                <PricingCard
                            {...user}
                            key={user.id}
                        />

      ))}
        </div> 
);
}
export default Plans; 
