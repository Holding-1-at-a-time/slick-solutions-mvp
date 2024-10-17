import React from 'react';

interface Props {
  assessment: AssessmentData;
}

const ReviewSubmit: React.FC<Props> = ({ assessment }) => {
  return (
    <div>
      <h3>Review Your Assessment</h3>
      <p>Vehicle Info: {assessment.vehicleInfo}</p>
      <p>Exterior Condition: {assessment.exteriorCondition}</p>
      <p>Interior Condition: {assessment.interiorCondition}</p>
      <p>Additional Details: {assessment.additionalDetails}</p>
    </div>
  );
};

export default ReviewSubmit;
