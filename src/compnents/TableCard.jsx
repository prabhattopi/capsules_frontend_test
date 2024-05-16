import React, { useState, useEffect } from "react";

const TableCard = ({ item,index }) => {
  // Initial form selected
  const [form, setForm] = useState(item.available_forms[0]);

  // Function to compute strength options based on the current form
  const computeStrengthOptions = (currentForm) => {
    return Object.keys(item.salt_forms_json?.[currentForm] || {}).slice(0, 2);
  };

  // State for strength options and the selected strength
  const [strengthOptions, setStrengthOptions] = useState(() => computeStrengthOptions(form));
  const [strength, setStrength] = useState(strengthOptions[0]);

  // Function to compute packing options based on the current form and strength
  const computePackingOptions = (currentForm, currentStrength) => {
    return Object.keys(item.salt_forms_json?.[currentForm]?.[currentStrength] || {}).slice(0, 2);
  };

  // State for packing options and the selected packing
  const [packingOptions, setPackingOptions] = useState(() => computePackingOptions(form, strength));
  const [packing, setPacking] = useState(packingOptions[0]);

  // State to manage the expansion of the form list
  const [isExpanded, setIsExpanded] = useState(false);

  // Effect to update strength and packing when form changes
  useEffect(() => {
    const newStrengthOptions = computeStrengthOptions(form);
    setStrengthOptions(newStrengthOptions);
    setStrength(newStrengthOptions[0]); // Reset strength to the first available option

    const newPackingOptions = computePackingOptions(form, newStrengthOptions[0]);
    setPackingOptions(newPackingOptions);
    setPacking(newPackingOptions[0]); // Also reset packing
  }, [form, item.salt_forms_json]);

  // Effect to update packing when strength changes
  useEffect(() => {
    const newPackingOptions = computePackingOptions(form, strength);
    setPackingOptions(newPackingOptions);
    setPacking(newPackingOptions[0]);
  }, [strength, item.salt_forms_json, form]);

  const [allValuesNull, setAllValuesNull] = useState(true);
  const [lowestSellingPrice, setLowestSellingPrice] = useState(null);

  useEffect(() => {
    if (form && strength && packing) {
      const prices = Object.values(item.salt_forms_json?.[form]?.[strength]?.[packing] || {});
      console.log(prices)
      const validPrices = prices.filter(price => price !== null);
      console.log(validPrices,"validPrices")
      setAllValuesNull(validPrices.length === 0);
      if (validPrices.length > 0) {
        setLowestSellingPrice(Math.min(...(validPrices.flat().map(e=>e.selling_price))));
      } else {
        setLowestSellingPrice(null);
      }
    }
  }, [packing, item.salt_forms_json, form, strength]);

  // Handler for selecting form, strength, and packing
  console.log(lowestSellingPrice,"allValuesNull")
  const handleSelectSalt_json = (name, label) => {
    switch (label) {
      case "form":
        setForm(name);
        break;
      case "strength":
        setStrength(name);
        break;
      case "packing":
        setPacking(name);
        break;
      default:
        break;
    }
  };

  // Toggle visibility of more forms
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
 const buttonStyle={
  border:``
 }

 // border color for strength
 const strengthBorderStyle=(name)=>{
  const prices = Object.values(item.salt_forms_json?.[form]?.[name]?.[packing] || {});
      console.log(prices)
      const validPrices = prices.filter(price => price !== null);
      console.log(validPrices,"validPrices")
      if(validPrices.length === 0){
        return "2px dashed gray"

      }
      else{
        return "2px solid gray"
      }



 }

 //----------------------------------------------------------------
 const packingBorderStyle=(name,index)=>{
  const prices = Object.values(item.salt_forms_json?.[form]?.[strength]?.[name] || {});
      console.log(prices)
      const validPrices = prices.filter(price => price !== null);
      console.log(validPrices,"validPrices")
      if(validPrices.length === 0){
        return "2px dashed gray"

      }
      else{
        return "2px solid gray"

      }

 }


 //-----funciton for creating the A,B,C,...Z,AA,....---------
 const indexToColumn = (index) => {
  let label = '';
  let base = 26;
  let A = 'A'.charCodeAt(0);

  while (index >= 0) {
    label = String.fromCharCode(A + (index % base)) + label;
    index = Math.floor(index / base) - 1;
  }

  return label;
};
  return (
    <div 
    style={{
      background: "linear-gradient(to right, white, #e8f2f1)"
    }}
    className="border-2 h-auto border-black flex justify-between shadow-lg rounded-xl px-6 py-2">
      <div className="flex flex-col gap-4 flex-1">
        {/* Form selection */}
        <div className="flex gap-2 items-start">
          <div className="font-bold w-[80px]">Form:</div>
          <div className="flex w-[55%] flex-wrap gap-2 relative">
            {(isExpanded ? item.available_forms : item.available_forms.slice(0, 4)).map((e, index) => (
              <button
                key={index}
                onClick={() => handleSelectSalt_json(e, "form")}
                style={{ border: `${form===e?allValuesNull?"4px dashed gray":"2px solid green":"2px solid gray"}` }}
                className={`${form===e?"opacity-100":"opacity-40"} min-w-[40%] h-10 rounded-xl px-2 py-2 flex justify-center items-center text-[12px] font-bol`}
              >
                <span>{e}</span>
              </button>
            ))}
            {item.available_forms.length > 4 && (
              <button
                onClick={toggleExpand}
                className="absolute bottom-0 right-[-10%] font-bold"
              >
                {isExpanded ? "hide..." : "more..."}
              </button>
            )}
          </div>
        </div>

        {/* Strength selection */}
        <div className="flex gap-2 items-center">
          <div className="font-bold w-[80px]">Strength:</div>
          <div className="flex w-[60%] flex-wrap gap-2">
            {strengthOptions.map((e, i) => (
              <button
                key={i}
                onClick={() => handleSelectSalt_json(e, "strength")}
                style={{ border: `${strength===e?allValuesNull?"4px dashed gray":"2px solid green":strengthBorderStyle(e)}` }}
                className={`${strength===e?"opacity-100":"opacity-40"} min-w-[40%] h-10 rounded-xl px-2 py-2 flex justify-center items-center`}
              >
                <span className="text-[10px] font-bold">{e}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Packing selection */}
        <div className="flex gap-2 items-center">
          <div className="font-bold w-[80px]">Packing:</div>
          <div className="flex w-[60%] flex-wrap gap-2">
            {packingOptions.map((e, i) => (
              <button
                key={i}
                onClick={() => handleSelectSalt_json(e, "packing")}
                style={{ border: `${packing===e?allValuesNull?"4px dashed gray":"2px solid green":packingBorderStyle(e)}` }}
                className={`${packing===e?"opacity-100":"opacity-40"} min-w-[40%] h-10 rounded-xl px-2 py-2 flex justify-center items-center`}
              >
                <span className="text-[10px] font-bold">{e}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-[14px] w-[35%] overflow-hidden">
        <div className="font-bold">Salt {indexToColumn(index)}</div>
        <div className="flex gap-2">
          <div>{form}</div>
          <div>| {strength}</div>
          <div className="">| {packing}</div>
        </div>
      </div>

      <div className="flex items-center justify-center w-[25%]">
        {
          allValuesNull?<div style={{
            border: "2px solid gray"
          }} className="text-center text-[#387872] px-4 py-2 rounded-sm font-bold text-[14px]">No stores selling this product near you</div>:<div className="text-[#387872] font-bold text-[16px]">From &#x20B9;{lowestSellingPrice}</div>
        }
       
      </div>
    </div>
  );
};

export default TableCard;
