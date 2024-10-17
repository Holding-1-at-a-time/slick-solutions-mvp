import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { toast } from 'react-toastify'; // Replace with your actual toast component import
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported for styling

interface Rule {
  id: string;
  description: string;
  multiplier: number;
}

// Assuming these functions are correctly defined in your Convex project
import { getRules, updatePricingRule } from '../../convex/_generated/api';

const PricingAdmin = () => {
  const rules = useQuery(getRules);
  const updateRule = useMutation(updatePricingRule);

  const handleUpdateRule = async (ruleId: string, newMultiplier: number) => {
    try {
      await updateRule({ ruleId, newMultiplier });
      toast.success("Rule updated successfully");
    } catch (error: any) {
      toast.error(`Update failed: ${error.message}`);
    }
  };

  return (
    <div>
      {rules?.map((rule: Rule) => (
        <div key={rule.id}>
          <span>{rule.description}</span>
          <input
            type="number"
            value={rule.multiplier}
            onChange={(e) => handleUpdateRule(rule.id, parseFloat(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingAdmin;
