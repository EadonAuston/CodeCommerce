import React from "react";
import style from '../ShippingInfo/ShippingInfo.module.css';
import ShippingProduct from "./ShippingProduct";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faCreditCard, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import {validate, validateStr,  validatePostCode, validatePhoneNumber} from '../../validation'
import { library } from '@fortawesome/fontawesome-svg-core';
import ProgressBar from "../ProgressBar/ProgressBar";
import Countries from "../SelectTag/Countries";
import Cities from "../SelectTag/Cities";
import States from "../SelectTag/States";
import SignupLoginInput from "../SignupLogin/SignupLoginInput";
library.add(faCheck, faTruck, faCreditCard, faCircleCheck );


class ShippingInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      addressTitle: '',
      name: '',
      address: '',
      zip: '',
      cellPhone: '',
      telePhone: '',
      isAddressTitleGood: false,
      isNameGood: false,
      isAddressGood: true,
      isZipGood: false,
      isCellPhoneGood: false,
      isTelePhoneGood: false,
      error : {},
    };
  }
  handleInputChange = ({ target : {name, value}}) => {
    let newvalue = value;
    this.setState({
       [`${name}`]: newvalue,
    }, () => {
     
      
      
       validate(this.state.addressTitle,'isAddressTitleGood', this, /(^[A-Z]\D+)$/g);
       validate(this.state.name,'isNameGood', this, /(^[A-Z]\D+)$/g);
       validate(this.state.address,'isAddressGood', this, /(^[A-Z]\D+)$/g);
       validate(this.state.zip, 'isZipGood', this, /^(\d+)$/g);
       validate(this.state.cellPhone, 'isCellPhoneGood', this, /[0-9]{10}$/g);
       validate(this.state.telePhone, 'isTelePhoneGood', this, /[0-9]{10}$/g);
    })

    if (name === 'zip') {
      this.props.changeZip(value);
    }
    if (name === 'addressTitle') {
      this.props.changeAddressTitle(value);
    }
    if (name === 'address') {
      this.props.changeAddress(value);
    }

   
    
 }

 handleValidations = (type, value) => {
    let errorText;
    switch(type) {
       case 'addressTitle' :
          errorText = validateStr(value);
          this.setState((prevState) => ({
                error: {
                   ...prevState.error,
                   addressTitleError: errorText,
                },
          }))
          break;
       case 'name':
          errorText = validateStr(value);
          this.setState((prevState) => ({
             error: {...prevState.error, nameError : errorText}
          }))
          break;
      //  case 'address':
      //     errorText = validateStr(value);
      //     this.setState((prevState) => ({
      //        error: {...prevState.error, addressError : errorText}
      //     }))
      //     break;
       case 'zip':
          errorText = validatePostCode(value);
          this.setState((prevState) => ({
             error: {...prevState.error, zipError : errorText}
          }))
          break;
          case 'cellPhone':
          errorText = validatePhoneNumber(value);
          this.setState((prevState) => ({
             error: {...prevState.error, cellPhoneError : errorText}
          }))
          break;
          case 'telePhone':
          errorText = validatePhoneNumber(value);
          this.setState((prevState) => ({
             error: {...prevState.error, telePhoneError : errorText}
          }))
          break;
       default : 
       break;
    }
 }

 handleBlur = ({ target: {name, value}}) => this.handleValidations(name, value);


 handleSubmit = (e) => {
  const {isAddressTitleGood, isNameGood, isAddressGood, isZipGood,  isCellPhoneGood,  isTelePhoneGood} = this.state;
 
     if (isAddressTitleGood && isNameGood &&  isAddressGood && isZipGood && isCellPhoneGood && isTelePhoneGood) {
        
        e.preventDefault();
        
       
        this.props.changePage();
        return
     } else {e.preventDefault();}
     

  
}

   render() {

    const inputData = [
      {labelHTML: 'Address Title', inputName: 'addressTitle', inputPlaceholder: '', type: 'text', error: 'addressTitleError'},
      {labelHTML: 'Name - Surname', inputName: 'name', inputPlaceholder: '', type: 'text', error: 'nameError'},
      {labelHTML: 'Address', inputName: 'address', inputPlaceholder: '', type: 'text', error: 'addressError'},

     
     
   ];

   const restData = [
    {labelHTML: 'Cellphone', inputName: 'cellPhone', inputPlaceholder: '', type: 'number', error: 'cellPhoneError'},
    {labelHTML: 'Telephone', inputName: 'telePhone', inputPlaceholder: '', type: 'number', error: 'telePhoneError'},
   ]



     return (
    <div className={style.shippingInfoForm}>
      
      <div className={style.flexbox}>
        <div className={`${style.vFlexbox} ${style.w65}`}>
          
        <ProgressBar shipping={true}/>
          <div className={` ${style.box}`}>
            <h1>SHIPPING INFORMATION</h1>
            <hr />
            <form action="#">
            {inputData.map((item) => (
              <SignupLoginInput
              shippingPage={true}
              type={item.type ? item.type : 'text'}
              autoComplete="off"
              onChange = {this.handleInputChange}
              onBlur={this.handleBlur}
              labelHTML={item.labelHTML} 
              inputName={item.inputName} 
              inputPlaceholder={item.inputPlaceholder}
              errorM={
                (this.state.error
                && this.state.error[item.error]
                && this.state.error[item.error].length > 1)
                ? this.state.error[item.error]
                : null
              }
              
              />
              ))}
              

              <div className={style.flexStart}>
              <SignupLoginInput
              shippingPage={true}
              type='number'
              autoComplete="off"
              onChange = {this.handleInputChange}
              onBlur={this.handleBlur}
              labelHTML='Zip Code' 
              inputName='zip' 
              inputPlaceholder=''
              errorM={
                (this.state.error
                && this.state.error['zipError']
                && this.state.error['zipError'].length > 1)
                ? this.state.error['zipError']
                : null
              }
              
              />
              <label htmlFor="" className={style.label}>Country</label>
              <Countries />
              <label htmlFor="" className={style.label}>City</label>
              <Cities changeCities={this.props.changeCity}/>
              <label htmlFor="" className={style.label}>State</label>
              <States />
              </div>


              {/* <div className={style.flexbox}>
                <label htmlFor="">Cellphone</label>(<input type="number"/>)<input type="number"/>-<input type="number"/>
              </div>
              
              <div className={style.flexbox}>
                <label htmlFor="">Telephone</label>(<input type="number"/>)<input type="number"/>-<input type="number"/>
              </div> */}

              {restData.map((item) => (
                <SignupLoginInput
                shippingPage={true}
                type={item.type ? item.type : 'text'}
                autoComplete="off"
                onChange = {this.handleInputChange}
                onBlur={this.handleBlur}
                labelHTML={item.labelHTML} 
                inputName={item.inputName} 
                inputPlaceholder={item.inputPlaceholder}
                errorM={
                  (this.state.error
                  && this.state.error[item.error]
                  && this.state.error[item.error].length > 1)
                  ? this.state.error[item.error]
                  : null
                }
                
                />
                ))}

             
              <hr />
              <h1>SHIPPING METHOD</h1>
              <div className={style.flexStart}>
                <input type="radio" className={style.w5} onClick={this.props.toggleStandardShipping} name="method" id="1" defaultChecked={this.props.shippingCost === 0 ? true : false}/>
                <label htmlFor="" className={style.w15}>STANDARD</label>
                <span>Delivery in 4 to 6 Business Days - Free ($40 min.)</span>
              </div>
              
              <br />
              <div className={style.flexStart}>
                <input type="radio" className={style.w5} onClick={this.props.toggleExpressShipping} name="method" id="2" defaultChecked={this.props.shippingCost === 5 ? true : false}/>
                <label htmlFor="" className={style.w15}>EXPRESS</label>
                <span>Deliver in 1 to 3 Business Days - $5.00</span>
                <p className={style.ml25}>View Shipping Details</p>
              </div>
              <button className={style.backButton} onClick={() => {this.props.reversePage()}}>BACK TO CART</button>
              
            </form>
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
            <span className={style.discount}>{`-$${this.props.discount === 1 ? "0.00" : `${((this.props.discount === 1 ? +this.props.cartTotal.toFixed(2) : (+this.props.cartTotal * 100 / 85).toFixed(2)) * (1 - +this.props.discount)).toFixed(2)}`}`}</span>
          </div>
          
          <br />
          <div className={style.flexbox}>
            <span>Cart Total:</span>        
            <span className={style.cartTotal}>{(+this.props.cartTotal + this.props.shippingCost).toFixed(2)}</span>
          </div>
          
          <br />
          <hr />
          <button 
                     className={`${style.checkoutButton} ${this.props.cartData.length ? null : style.disabled}`}  
                     onClick={this.handleSubmit}>Checkout
                  </button>
        
          
        </div>
      </div>
     
      
       
    </div>
     );
   }
 }

export default ShippingInfo;