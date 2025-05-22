interface ProductFilterProps {
  selectedCuisines: string[];
  selectedProductTypes: string[];
  availableCuisines: string[];  
  availableProductTypes: string[];   
  onFilterChange: (
    selectedCuisines: string[],
    selectedProductTypes: string[]
  ) => void;
}

function ProductFilter({
  selectedCuisines,
  selectedProductTypes,
  availableCuisines,
  availableProductTypes,
  onFilterChange,
}: ProductFilterProps) {

  const toggleCuisine = (cuisine: string) => {
    const newSelected = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter((c) => c !== cuisine)
      : [...selectedCuisines, cuisine];

    onFilterChange(newSelected, selectedProductTypes);
  };

  const toggleProductType = (type: string) => {
    const newSelected = selectedProductTypes.includes(type)
      ? selectedProductTypes.filter((t) => t !== type)
      : [...selectedProductTypes, type];

    onFilterChange(selectedCuisines, newSelected);
  };

  return (
    <div className="mb-4">
      <h5>Cuisines</h5>
      {availableCuisines.map((cuisine) => ( 
        <div key={cuisine} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`cuisine-${cuisine}`}
            checked={selectedCuisines.includes(cuisine)}
            onChange={() => toggleCuisine(cuisine)}
          />
          <label className="form-check-label" htmlFor={`cuisine-${cuisine}`}>
            {cuisine}
          </label>
        </div>
      ))}

      <h5 className="mt-4">Product Types</h5>
      {availableProductTypes.map((type) => (   
        <div key={type} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id={`type-${type}`}
            checked={selectedProductTypes.includes(type)}
            onChange={() => toggleProductType(type)}
          />
          <label className="form-check-label" htmlFor={`type-${type}`}>
            {type}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ProductFilter;
