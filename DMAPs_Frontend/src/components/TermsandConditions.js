import React from "react";
import Button from "react-bootstrap/Button";
import "./TermsandConditions.scss";

function TermsandConditions (componentprops) {
	const clearState = () => {
		componentprops.clearState(0);
	};

	const AgreeState = () => {
		componentprops.clearState(1);
	};

	return (
		<div>
			<div className="overlay">
				<div className="container mt-5">
					<div className="p-3 bg-white rounded shadow-lg text-center">
						<div className="position-relative">
						<h5 className="d-flex"><strong>Terms & Conditions</strong></h5>
						<i className="fa fa-times closeModal" onClick={clearState}></i>
						</div>
						<hr></hr>
						<div className="col-12 pad-2 mt-3">
							Detailed Terms & Conditions
						</div>
						<hr></hr>
						<div className="col-12 mt-3 text-center">
						<Button className="mt-2 greenBtn btn-sm" variant="primary" onClick={AgreeState} >{" "}Agree{" "}</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}
export default TermsandConditions;