import React from "react";
import Authentication from "../Authentication/Authentication";
import Checkout from "../Checkout/Checkout";
import style from '../CustomerCart/CustomerCart.module.css';

class Main extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoggedIn: false,
         cartData: [
            {img : style.firstImg, gender: "Women", description: 'Floral Print Wrap Dress', color: 'Navy Blue', size: '42', price: '21.50', id: '1', q: '1'},
            {img : style.secondImg, gender: "Women", description: 'Floral Print Wrap Dress', color: 'Navy Blue', size: '42', price: '21.50', id: '2', q: '1'},
            {img : style.thirdImg, gender: "Men", description: 'Nike Shoes', color: 'White', size: '12', price: '42.50', id: '3', q: '1'},
            {img : style.fourthImg, gender: "Men", description: 'Adidas Shoes', color: 'Red', size: '11', price: '32.50', id: '4', q: '1'},
            {img : style.fifthImg, gender: "Men", description: 'Puma Jacket', color: 'Black', size: 'L', price: '27.40', id: '5', q: '1'},
         ],
         promoCode: '',
         discount: 1,
         eMail: '',
         shippingCost: 0,
         zipCode: '',
         cardType: '',
         addressTitle: '',
         address: '',
         city: 'Paris',
         cardNumber: '',

      }
   }


   setCartTotal = () => {
      const {totalPrice1, totalPrice2, totalPrice3, totalPrice4, totalPrice5} = this.state;
      this.setState({
         cartTotal: this.state.discount * (totalPrice1 + totalPrice2 + totalPrice3 + totalPrice4 + totalPrice5),
      })
   }

   toggleExpressShipping = () => {
      this.setState({shippingCost: 5})
   }
   toggleStandardShipping = () => {
      this.setState({shippingCost: 0})
   }

   componentDidMount = () => {
      this.setState({
         price1: this.state.cartData[0].price,
         price2: this.state.cartData[1].price,
         price3: this.state.cartData[2].price,
         price4: this.state.cartData[3].price,
         price5: this.state.cartData[4].price,

         totalPrice1: this.state.cartData[0].price * this.state.cartData[0].q,
         totalPrice2: this.state.cartData[1].price * this.state.cartData[1].q,
         totalPrice3: this.state.cartData[2].price * this.state.cartData[2].q,
         totalPrice4: this.state.cartData[3].price * this.state.cartData[3].q,
         totalPrice5: this.state.cartData[4].price * this.state.cartData[4].q,
      }, () => {
         this.setCartTotal();
      })
   }

   deleteCircle = (target) => {
      console.log(target)
      const foundIndex = this.state.cartData.findIndex(ele => ele.id === target.id);
      let diffArr = this.state.cartData;
      diffArr.splice(foundIndex, 1);
      this.setState({
         cartData: diffArr,
         [`totalPrice${target.id}`]: 0,
         [`${target.id}`]: 0,
      }, () => {
         this.setCartTotal();
      })

   }

   setQuantity = (target) => {
      
      let arr = this.state.cartData;
      const foundIndex = this.state.cartData.findIndex(ele => ele.id === target.id);
      arr[foundIndex].q = target.selectedOptions[0].label;
      this.setState({
         cartData: arr,
         [`${target.id}`]: target.selectedOptions[0].label
      }, () => {
         this.setState({
            [`totalPrice${target.id}`]: this.state[`${target.id}`] * this.state[`price${target.id}`]
         }, () => {
            this.setCartTotal();
         })
      })
   }

   changePage = () => {
      this.setState({
         isLoggedIn: !this.state.isLoggedIn,
      })
   }

   onMount = () => {
      this.setState({

      })
   }

   handlePromo = (value) => {
      console.log(value)
      this.setState({
         promoCode: value,
      }, () => {
         this.state.promoCode === "PROMO15" ?  
         this.setState({isCouponCodeGood: true}) : 
          this.setState({isCouponCodeGood: false});
      })
   }

   applyCoupon = () => {
      this.state.isCouponCodeGood ? 
      this.setState({discount: .85},
       () => {
         this.setState({cartTotal: (this.state.discount * (this.state.totalPrice1 + this.state.totalPrice2 + this.state.totalPrice3 + this.state.totalPrice4 + this.state.totalPrice5)).toFixed(2),});
         this.setState({discountText: "-15%"});
       }) :
      this.setState({
         couponError: "This is not a valid coupon.",
         discount: 1,
      })
   }

   getMail = (value) => {
      console.log(value)
      this.setState({
         eMail: value,
      })
   }

   addCard = (value) => {
       this.setState({cardType: value});
   }

   addCardNumber = (value) => {
      this.setState({cardNumber: value});
  }


   changeZip = (value) => {
      this.setState({
         zipCode: value,
      })
   }

   changeAddressTitle = (value) => {
      this.setState({addressTitle : value});
   }

   changeAddress = (value) => {
      this.setState({address : value});
   }

   changeCity = (e) => {
      this.setState({city : e.target.value});
      console.log(e)
      console.log(e.target)
      console.log(e.target.value)
   }

   

  


   render(){
   const { isLoggedIn } = this.state;
      return(
         <div>
            {isLoggedIn ?
            <Checkout 
            cartData={this.state.cartData} 
            deleteCircle={this.deleteCircle} 
            setQuantity={this.setQuantity} 
            onMount={this.onMount}
            handlePromo={this.handlePromo}
            applyCoupon={this.applyCoupon}
            cartTotal={this.state.cartTotal}
            promoCode={this.state.promoCode}
            discount={this.state.discount}
            totalPrice1={this.state.totalPrice1}
            totalPrice2={this.state.totalPrice2}
            totalPrice3={this.state.totalPrice3}
            totalPrice4={this.state.totalPrice4}
            totalPrice5={this.state.totalPrice5}
            toggleExpressShipping={this.toggleExpressShipping}
            toggleStandardShipping={this.toggleStandardShipping}
            shippingCost={this.state.shippingCost}
            changeZip={this.changeZip} 
            addCard={this.addCard}
            addCardNumber={this.addCardNumber}
            cardType={this.state.cardType}
            changeAddressTitle={this.changeAddressTitle}
            changeAddress={this.changeAddress}
            changeCity={this.changeCity}
            cardNumber={this.state.cardNumber}
            addressTitle={this.state.addressTitle}
            address={this.state.address}
            zipCode={this.state.zipCode}
            city={this.state.city}
            eMail={this.state.eMail}
            />
            
            : 
            <Authentication 
            changePage={this.changePage}
            getMail={this.getMail}/>}
         </div>
      )
   }
}

export default Main;