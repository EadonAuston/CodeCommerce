import React from "react";
import style from '../CustomerCart/CustomerCart.module.css';


const ConfirmationItem = ({img, description, color, size, basePrice, totalPrice, ...props}) => (
   
   <div className={style.confirmationContainer} {...props}>
     
      <div className={style.productStats}>
         <div className={img} style={{backgroundSize: 'cover', height: '80px', marginRight: '20px'}}></div>
       
         
         <div className="info" style={{width: '600px'}}>
           
            <div>{description}</div>
            <div>Color: {color}</div>
            <div>Size: {size}</div>
         </div>

      </div>

      <div>Qty: {(totalPrice / basePrice).toFixed(0)}</div>
         <div className={`${style.flexbox} ${style.center}`}>
            
            <div>${totalPrice.toFixed(2)} </div>
         </div>
     
   </div>
)

export default ConfirmationItem;