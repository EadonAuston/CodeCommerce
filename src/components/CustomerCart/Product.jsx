import React from "react";
import style from './CustomerCart.module.css';


const Product = ({img, gender, description, color, size, price, totalPrice, setQuantity, id, setTotalPrice, deleteCircle, q, shipping, test, ...props}) => (
   
   <div className={style.productContainer} {...props}>
      <div className={style.circle} onClick={deleteCircle} id={id}>X</div>
      <div className={style.productStats}>
         <div className={img} style={{backgroundSize: '150px 150px', marginRight: '20px'}}></div>
       
         
         <div className="info" style={{width: '600px'}}>
            <div>{gender}</div>
            <div>{description}</div>
            <div>Color: {color}</div>
            <div>Size: {size}</div>
         </div>

      </div>


         <div className={`${style.flexbox} ${style.center}`}>
            <div className={style.marginRight2}>${price}</div>
            <select className={style.marginRight2} onChange={setQuantity} value={q} name="" id={id}>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
            </select>
            <div className={style.marginRight2} onClick={setTotalPrice} id={id} >${totalPrice}</div>
         </div>
     
   </div>
)

export default Product;