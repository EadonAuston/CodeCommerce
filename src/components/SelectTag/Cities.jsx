import React from "react";



const Cities = ({changeCities}) => (
   <select placeholder="Select" onChange={changeCities}>
      <option value="" disabled defaultValue hidden>Select</option>
      <option value="Paris">Paris</option>
      <option value="London">London</option>
      <option value="Athens">Athens</option>
      <option value="Madrid">Madrid</option>
   </select>
)

export default Cities;