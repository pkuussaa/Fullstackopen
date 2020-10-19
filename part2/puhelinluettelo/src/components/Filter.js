import React from "react";

const Filter = (props) => {

	const handleFilter = (event) => {
	  props.setFilter(event.target.value)
	}

	return (
	  <div>
		<form>
		  <div>
			filter shown with<input
			value={props.filter}
			onChange={handleFilter}
			/>
		  </div>
		</form>
	  </div>
	)
  }

export default Filter;
