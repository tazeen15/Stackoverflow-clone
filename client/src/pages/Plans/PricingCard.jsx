import React from "react";

import "./Plans.css";

function CardDescription({ title, description }) {	
	return (
		<div className="card-description">
			<h2>{ title }</h2>
			<p>{ description }</p>
		</div>
	);
};

function CardBilling({ price }) {
	return (
		<div className="card-billing">
			<p>
				<strong className="price">₹ { price }</strong>
        <strong> / mo.</strong>
			</p>
			<p>
				<span className="recurrency">
					Billed ₹{price}/monthly
				</span>
			</p>
		</div>
	);
};

function CardFeatures({ data }) {	
	return (
		<div className="card-features">
			<ul>
				{ 
					data.map((item, index) => {
						return (
							<li key={index}>{item}</li>
						)
					})
				}
			</ul>
		</div>
	);
};


function PricingCard(props) {	
    const { 
      type,
      title,
      description,
      price,
      mostPopular,
      data,
    } = props;
    console.log(type)
    return (
			<div className={`card pricing-card ${type}`}>
        { (mostPopular) ? <span className="most-popular">Most Popular</span> : null }
			<CardDescription title={title} description={description} />
			<CardBilling price={price} />
	<CardFeatures data={data} />
	{/*<CardAction type={type} description={description} price={price} />*/}
	  </div>
      
    );
};

export default PricingCard;
