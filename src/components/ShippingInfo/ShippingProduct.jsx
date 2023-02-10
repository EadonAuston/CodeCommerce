import React from "react";
import style from '../CustomerCart/CustomerCart.module.css';


const ShippingProduct = ({img, description, color, size, price, q, ...props}) => (
   
   <div className={style.shippingContainer} {...props}>
      <div className={style.shippingStats}>
         <div className={img} style={{backgroundSize: 'cover', height: '100px', marginBottom: '-10px', marginRight: '20px'}}></div>
       
         
         <div className="info" style={{width: '600px'}}>
            <div className={style.vFlexbox}>
               <div className={`${style.bold} ${style.mb5}`}>{description}</div>
               <div>
                  <div>Color: {color}</div>
                  <div>Size: {size}</div>
                  <div className={style.flexbox}>
                     <div>Qty: {q}</div>
                     <div className={style.bold}>${price}</div>
                  </div>
               </div>
            </div>
            
           
            
            
         </div>

      </div>


        
     
   </div>
)

export default ShippingProduct;