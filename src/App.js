import {Component} from 'react';
import { AiFillStar } from 'react-icons/ai';
import './App.css';
import FilterSection from './components/filterSection';
import { MdLocalOffer} from 'react-icons/md';
import {BiCartAdd} from 'react-icons/bi';
import {MdFlashOn} from 'react-icons/md';

class App extends Component {
  state={
    itemList:[],
    initialItem:{},
    message:"",
    date:"",
    pincode:"",
    addonitem:[],
    extraitem:[],
    addCount:0
  }
  componentDidMount(){
    this.x()
  }

  pincodeChange=(event)=>{
    this.setState({pincode:event.target.value})
  }

  messageChange=(event)=>{
    this.setState({message:event.target.value})
  }
  dateChange=(event)=>{
    this.setState({date:event.target.value})
  }

  submitForm=async(event)=>{
    event.preventDefault();
    const {date,message,pincode}=this.state
    console.log(date);
    console.log(message);
    console.log(pincode);
    if(date===""&&message===""&&pincode===""){
      alert("Please fill all fields");
    }
    else{
      const {message,pincode,date,extraitem}=this.state;

      const userdata={pincode,message,date,extraitem}
      const options = {
        method: 'POST',
        body: JSON.stringify(userdata),
      }
      const response = await fetch("https://product-items.onrender.com/addcart", options);
      const data=await response.json();
      const result=data.result;
      console.log(result)
      alert(result);
      
    }
  }

  x=async()=>{
    const y=await fetch("https://product-items.onrender.com/");
    const a=await y.json();
    this.setState({itemList:a,initialItem:a[0]});
  }
  addonItem=async()=>{
    const response=await fetch("https://product-items.onrender.com/addon");
    const data=await response.json();
    this.setState({addonitem:data});
  }
  addonItemHide=()=>{
    this.setState({addonitem:[],extraitem:[]})
  }
  extraItem=(id)=>{
    const {addonitem,extraitem}=this.state
    addonitem.filter((each)=>{
      if(id===each.id){
        this.setState({extraitem:[...extraitem,each]});
      }
    })
  }

  filter=(id)=>{
    const {itemList}=this.state;
    itemList.filter((each)=>
    {
     if(id===each.id){
      this.setState({initialItem:each})
    }}
    );
    
  }

  render(){
    const {itemList,initialItem,message,pincode,date,addonitem,extraitem}=this.state;
    console.log(date);
    const {new_price,discount,old_price,rating_describtion,rating,top_length,bottom_length}=initialItem;
    return (
      <div className="App">
        <FilterSection item={initialItem} initialImage={initialItem.back_view_image}/>
        <div className='product-description'>
            <p className='product-para'> Siril </p>
            <h1 className='product-heading'>
            Unstitched Polycotton Salwar Suit Material Polka Print, Checkered, Floral Print, Embellished, Printed, Paisley, Geometric Print
            </h1>
            <p className='special-price'> Special price</p>
            <div className='price-container'>
              <div >
                <span className='discount'> -{discount}</span>
                <span className='new-price'> {new_price}</span>
              </div>
              <div>
              <span className='mrp-span'>M.R.P.:</span>
              <span className='old-price'>{old_price}</span>

              </div>
            </div>
            {rating!==" " && rating_describtion!==" " ? <div className='rating-container'> <p className='rating-span'>{rating}<AiFillStar color='#ffffff'/> <span></span></p> <p className='rating-describtion'>{rating_describtion}</p></div>:<p className='first-review-para'>Be the first to Review this product</p>}
            <div className='color-container'>
            <p className='color-para'>color</p>
            <ul className='image-container'>
            {itemList.map((each)=>
              <li key={each.id} onClick={()=>this.filter(each.id)}><img src={each.lady_with_chair_image} className="image-1" alt="clothImage" />
              </li>
            )}
                
            </ul>
            </div>
              <div className='top-length-container'>
                <p className='top-length-para'>Unstitched Top Length</p>
                <p >{top_length}</p>
              </div>
              <div className='bottom-length-container'>
                <p className='bottom-length-para'>Unsticthed Bottom Length</p>
                <p>{bottom_length}</p>
              </div>
              <h2 className='available-offer-heading'>Available offers</h2>
              <div className='offer-list'>
              <p> <MdLocalOffer color='#26a541'/> Special PriceGet extra 8% off (price inclusive of cashback/coupon) <span className='t-c-span'>T&C</span></p>
              <p> <MdLocalOffer color='#26a541'/> Extra ₹2,000 Off on Bikes & Scooters on purchase of ₹30,000 or more <span className='t-c-span'>T&C</span></p>
              <p> <MdLocalOffer color='#26a541'/> Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500* <span className='t-c-span'>Know More</span></p>
              </div>
              
               { addonitem===[]?"":<ul className='addon-item-container'>
                 { addonitem.map((each)=>(
                  <li key={each.id} onClick={()=>this.extraItem(each.id)}><img src={each.lady_with_chair_image} alt='' /></li>
                 ),
                 )}
                 {extraitem.length===0?"":<li ><span className='addon-item-count'>+{extraitem.length}</span><span className='item-add'>Added</span></li>}
                </ul>}
              <form className='form-container' onSubmit={this.submitForm}>
                    <div className='pincode-date-input-container'>
                      <input type="number" 
                        placeholder="Enter your pin code" 
                        name="pinCode"
                        id="pinCode"
                        className='pincode-input'
                        value={pincode}
                        onChange={this.pincodeChange}
                      />
                      <p className='addon-item-para'>Want to buy more Item</p>
                      <div className='radio-container'>
                      <div>
                        <input type="radio" 
                          placeholder="Enter your pin code" 
                          name="addonItem"
                          id="addonItem"
                          // value={"pincode"}
                          onChange={this.addonItem}
                          />
                        <label>Yes</label>
  
                      </div>
                      <div>
                        <input type="radio" 
                        placeholder="Enter your pin code" 
                        name="addonItem"
                        id="addonItem"
                        // value={"pincode"}
                        onChange={this.addonItemHide}
                        />
                        <label>No</label>
                      </div>
                      </div>
                        <button type='submit' className='addcart-btn'><BiCartAdd size="25px" color='#ffffff'/>ADD TO CART</button>
                      
                    </div>

                    <div className='radio-input-container'>
                    <input type="date" 
                      placeholder="Enter your pin code" 
                      name="dateTime"
                      id="dateTime"
                      className='date-input'
                      value={date}
                      onChange={this.dateChange}
                      />
                        <input type="text" 
                        placeholder="Massege" 
                        name="value"
                        id="value"
                        maxLength={25}
                        className='message-input'
                        value={message}
                        onChange={this.messageChange}
                        />
                        <button type='submit' className='buyitem-btn'><MdFlashOn size="25px" color='#ffffff'/>BUY NOW</button>
                    </div>
                    
                  </form>
                    </div>
      </div>
    );
  }
}

export default App;
