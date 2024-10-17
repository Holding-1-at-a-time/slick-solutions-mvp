"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";

export default function AssessmentPage() {
  const params = useParams();
  const assessmentId = params.id as Id<"assessments">;
  const assessment = useQuery(api.assessments.getAssessment, { id: assessmentId });

  if (!assessment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Assessment Details</h1>
      <pre>{JSON.stringify(assessment, null, 2)}</pre>
    </div>
  );
}
