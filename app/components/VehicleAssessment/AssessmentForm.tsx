"use client";

import { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser, useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Steps } from "./Steps";
import { VehicleInfo, ExteriorCondition, InteriorCondition, AdditionalDetails, ReviewSubmit } from "./steps";
import { AssessmentContext } from './AssessmentContext'; // Assuming this context is created to share state
import { toast } from "react-hot-toast";

const steps = [
  { id: "vehicle-info", name: "Vehicle Information" },
  { id: "exterior-condition", name: "Exterior Condition" },
  { id: "interior-condition", name: "Interior Condition" },
  { id: "additional-details", name: "Additional Details" },
  { id: "review-submit", name: "Review and Submit" },
];

const schema = z.object({
  vehicleInfo: z.object({...}),
  exteriorCondition: z.object({...}),
  interiorCondition: z.object({...}),
  additionalDetails: z.object({...}),
});

const AssessmentForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
  const { assessment, setAssessment } = useContext(AssessmentContext) as { assessment: Assessment, setAssessment: (assessment: Assessment) => void };
  const { user } = useUser();
  const { organization } = useOrganization();
  const router = useRouter();
  const saveAssessment = useMutation(api.assessments.save);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (methods.formState.isDirty) {
        saveAssessment(assessment).then(() => {
          toast.success("Assessment auto-saved");
        }).catch(error => {
          console.error("Auto-save failed:", error);
          toast.error("Auto-save failed. Please check your connection.");
        });
      }
    }, 5000);

    return () => clearInterval(autoSaveInterval);
  }, [assessment, saveAssessment, methods.formState.isDirty]);

  const onSubmit = async (data) => {
    try {
      const result = await saveAssessment({
        userId: user.id,
        tenantId: organization.id,
        ...data,
        status: "pending",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      toast.success("Assessment submitted successfully!");
      router.push(`/assessments/${result}`);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Failed to submit assessment. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Steps steps={steps} currentStep={currentStep} />
        {currentStep === 0 && <VehicleInfo />}
        {currentStep === 1 && <ExteriorCondition />}
        {currentStep === 2 && <InteriorCondition />}
        {currentStep === 3 && <AdditionalDetails />}
        {currentStep === 4 && <ReviewSubmit />}
        <div className="mt-4 flex justify-between">
          {currentStep > 0 && (
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit Assessment
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default AssessmentForm;
