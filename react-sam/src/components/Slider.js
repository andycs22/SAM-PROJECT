import React from 'react';
import demo1 from '../assets/images/demo1.jpg';
import demo2 from '../assets/images/demo2.jpg';
import demo3 from '../assets/images/demo3.jpg';



export function Slider() {

    return(   
      <div className="container-all">
      <input type="radio" id="1" name="image-slide" hidden/>
      <input type="radio" id="2" name="image-slide" hidden/>
      <input type="radio" id="3" name="image-slide" hidden/>
    

      <div className="slide">

          <div className="item-slide">
              <img src={demo1}/>
          </div>

          <div className="item-slide">
              <img src={demo2}/>
          </div>

          <div className="item-slide text">
              <img src={demo3} />
          </div>
          
      </div>

      <div className="pagination">
         
          <label className="pagination-item" for="1">
              <img src={demo1}/>
          </label>
          
          <label className="pagination-item" for="2">
              <img src={demo2}/>
          </label>
          
          <label className="pagination-item" for="3">
          <img src={demo3}/>
          </label> 
                   
      </div>      
  </div>
    );
}