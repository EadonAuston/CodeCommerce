import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import ShippingProduct from "../ShippingInfo/ShippingProduct";
import style from '../ShippingInfo/ShippingInfo.module.css';
import Form from "../CCForm/Form";

class PaymentInfo extends React.Component {
   render() {
      return (
     <div className={style.shippingInfoForm}>
       <div className={style.flexbox}>
        <div className={`${style.vFlexbox} ${style.w65}`}>
          
        <ProgressBar shipping={false}/>
        
          <div className={` ${style.box}`}>
           <h1>PAYMENT INFORMATION</h1>
           <hr />

           <Form
           changePage={this.props.changePage}
           cartTotal={this.props.cartTotal}
           addCard={this.props.addCard}
           addCardNumber={this.props.addCardNumber}
           />
            <button className={style.backButton} onClick={() => {this.props.reversePage()}}>BACK TO SHIPPING</button>
          </div>
        </div>
        <div className={style.rightSide}>
          <h1>SUMMARY</h1>
          <hr />
          <h2>{`${this.props.cartData.length}`} items <span className={style.normal}>in your bag</span> </h2>
          <hr />
          {this.props.cartData ? this.props.cartData.map((item) => (
                    
                  <ShippingProduct 
                    img={item.img}
                    description={item.description}
                    color={item.color}
                    size={item.size}
                    price={(item.price * item.q).toFixed(2)}
                    q={item.q}
                  />
          )
          ): null}
          <hr />
          <div className={style.flexbox}>
            <span>Cart Subtotal:</span>     
            <span>{`$${this.props.discount === 1 ? (+this.props.cartTotal).toFixed(2) : (+this.props.cartTotal * 100 / 85).toFixed(2)}`}</span>
          </div>
          
          <br />
          <div className={style.flexbox}>
            <span>Shipping & Handling</span>
            <span>{`$${this.props.shippingCost}.00`}</span>
          </div>
          
          <br />
          <div className={style.flexbox}>
            <span>Discount:</span>          
            <span>{`-$${this.props.discount === 1 ? "0.00" : `${((this.props.discount === 1 ? +this.props.cartTotal.toFixed(2) : (+this.props.cartTotal * 100 / 85).toFixed(2)) * (1 - +this.props.discount)).toFixed(2)}`}`}</span>
          </div>
          
          <br />
          <div className={style.flexbox}>
            <span>Cart Total:</span>        
            <span>{(+this.props.cartTotal + this.props.shippingCost).toFixed(2)}</span>
          </div>
          
          <br />
          <hr />
          <h1 className={style.tal}>SHIPMENT ADDRESS</h1>
          <p className={style.p}>{this.props.addressTitle}</p>
          <p className={style.p}>{this.props.address}</p>
          
          <p className={style.p}>{this.props.zipCode} {this.props.city}</p>
          {/* <p className={style.p}>{this.props.city}</p> */}
          
          <p className={style.p}>E-mail: {this.props.eMail}</p>

          <hr />
          <h1 className={style.tal}>SHIPPING METHOD</h1>
          {this.props.shippingCost === 0 ? 
          <div>
            <h3>STANDARD</h3>
          <p>Delivery in 4-6 working days</p>
          </div>
          
          :
          <div>
            <h3>EXPRESS</h3>
          <p>Delivery in 1-3 working days</p>
          </div>
          
        }
          








{/* 
          <button 
                     className={`${style.checkoutButton} ${this.props.cartData.length ? null : style.disabled}`}  
                     onClick={this.props.cartData.length ? () => {this.props.changePage()} : null}>Checkout
                  </button> */}
     </div>
     </div>
     </div>
      );
    }
  }
 

export default PaymentInfo;