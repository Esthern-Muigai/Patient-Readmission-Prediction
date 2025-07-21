import { PredictionResult, ContributingFactor, ModelMetrics } from '../types/patient';

export class ReadmissionPredictor {
  private model: RandomForestModel;
  private featureImportances: { [key: string]: number };
  
  constructor() {
    this.model = new RandomForestModel();
    this.featureImportances = this.getFeatureImportances();
  }

  /**
   * Predict readmission risk for a patient
   */
  predict(features: { [key: string]: number }): PredictionResult {
    // Simulate model prediction (in real implementation, use trained model)
    const riskScore = this.calculateRiskScore(features);
    const riskCategory = this.categorizeRisk(riskScore);
    const confidence = this.calculateConfidence(features);
    const contributingFactors = this.getContributingFactors(features);
    const recommendations = this.generateRecommendations(riskCategory, contributingFactors);

    return {
      patient_id: features.patient_id?.toString() || 'unknown',
      risk_score: riskScore,
      risk_category: riskCategory,
      confidence: confidence,
      contributing_factors: contributingFactors,
      recommendations: recommendations,
      prediction_date: new Date().toISOString()
    };
  }

  private calculateRiskScore(features: { [key: string]: number }): number {
    // Weighted feature scoring based on clinical importance
    const weights = {
      previous_admissions: 0.15,
      charlson_comorbidity_index: 0.12,
      length_of_stay: 0.10,
      age: 0.08,
      emergency_admission: 0.08,
      medication_complexity: 0.07,
      social_risk_score: 0.06,
      discharge_home: -0.05, // Negative weight (protective factor)
      num_diagnoses: 0.05,
      systolic_bp: 0.04,
      heart_rate: 0.04,
      oxygen_saturation: -0.03, // Higher O2 sat is protective
      is_weekend_discharge: 0.03,
      insurance_uninsured: 0.03,
      temperature: 0.02
    };

    let score = 0;
    Object.entries(weights).forEach(([feature, weight]) => {
      if (features[feature] !== undefined) {
        score += features[feature] * weight;
      }
    });

    // Add some randomness to simulate model uncertainty
    score += (Math.random() - 0.5) * 0.1;
    
    // Normalize to 0-1 range
    return Math.max(0, Math.min(1, score + 0.3));
  }

  private categorizeRisk(riskScore: number): 'Low' | 'Medium' | 'High' {
    if (riskScore < 0.3) return 'Low';
    if (riskScore < 0.7) return 'Medium';
    return 'High';
  }

  private calculateConfidence(features: { [key: string]: number }): number {
    // Confidence based on completeness of data and feature stability
    const totalFeatures = Object.keys(this.featureImportances).length;
    const availableFeatures = Object.keys(features).filter(key => 
      features[key] !== undefined && features[key] !== null
    ).length;
    
    const completeness = availableFeatures / totalFeatures;
    return Math.max(0.6, Math.min(0.95, completeness + Math.random() * 0.1));
  }

  private getContributingFactors(features: { [key: string]: number }): ContributingFactor[] {
    const factors: ContributingFactor[] = [];
    
    // Analyze key risk factors
    if (features.previous_admissions > 2) {
      factors.push({
        factor: 'Previous Admissions',
        importance: 0.85,
        description: `${features.previous_admissions} previous admissions indicate high readmission risk`
      });
    }

    if (features.charlson_comorbidity_index > 3) {
      factors.push({
        factor: 'Comorbidity Burden',
        importance: 0.78,
        description: `High comorbidity index (${features.charlson_comorbidity_index}) increases complexity`
      });
    }

    if (features.length_of_stay > 7) {
      factors.push({
        factor: 'Extended Length of Stay',
        importance: 0.65,
        description: `${features.length_of_stay} day stay suggests complex medical needs`
      });
    }

    if (features.age > 75) {
      factors.push({
        factor: 'Advanced Age',
        importance: 0.60,
        description: `Age ${features.age} associated with increased readmission risk`
      });
    }

    if (features.social_risk_score > 2) {
      factors.push({
        factor: 'Social Risk Factors',
        importance: 0.55,
        description: 'Multiple social barriers may impact post-discharge care'
      });
    }

    if (features.emergency_admission === 1) {
      factors.push({
        factor: 'Emergency Admission',
        importance: 0.50,
        description: 'Unplanned admission suggests unstable condition'
      });
    }

    return factors.sort((a, b) => b.importance - a.importance).slice(0, 5);
  }

  private generateRecommendations(
    riskCategory: 'Low' | 'Medium' | 'High',
    factors: ContributingFactor[]
  ): string[] {
    const recommendations: string[] = [];

    if (riskCategory === 'High') {
      recommendations.push('Schedule follow-up appointment within 7 days');
      recommendations.push('Arrange home health services');
      recommendations.push('Medication reconciliation and education');
      recommendations.push('Consider transitional care management');
    } else if (riskCategory === 'Medium') {
      recommendations.push('Schedule follow-up appointment within 14 days');
      recommendations.push('Provide detailed discharge instructions');
      recommendations.push('Ensure medication adherence plan');
    } else {
      recommendations.push('Standard discharge planning');
      recommendations.push('Follow-up as clinically indicated');
    }

    // Add specific recommendations based on contributing factors
    factors.forEach(factor => {
      switch (factor.factor) {
        case 'Social Risk Factors':
          recommendations.push('Social work consultation for discharge planning');
          break;
        case 'Comorbidity Burden':
          recommendations.push('Coordinate care with specialists');
          break;
        case 'Previous Admissions':
          recommendations.push('Review previous admission patterns and causes');
          break;
        case 'Advanced Age':
          recommendations.push('Geriatric assessment and fall prevention');
          break;
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }

  private getFeatureImportances(): { [key: string]: number } {
    // Simulated feature importances from trained Random Forest
    return {
      previous_admissions: 0.15,
      charlson_comorbidity_index: 0.12,
      length_of_stay: 0.10,
      age: 0.08,
      emergency_admission: 0.08,
      medication_complexity: 0.07,
      social_risk_score: 0.06,
      discharge_home: 0.05,
      num_diagnoses: 0.05,
      systolic_bp: 0.04,
      heart_rate: 0.04,
      oxygen_saturation: 0.03,
      is_weekend_discharge: 0.03,
      insurance_uninsured: 0.03,
      temperature: 0.02,
      respiratory_rate: 0.02,
      diastolic_bp: 0.02,
      age_group: 0.01
    };
  }

  /**
   * Get model performance metrics
   */
  getModelMetrics(): ModelMetrics {
    // Simulated metrics from model validation
    return {
      accuracy: 0.847,
      precision: 0.823,
      recall: 0.789,
      f1_score: 0.806,
      auc_roc: 0.891,
      confusion_matrix: [
        [1247, 89],   // TN, FP
        [156, 508]    // FN, TP
      ]
    };
  }
}

// Simplified Random Forest implementation (placeholder)
class RandomForestModel {
  predict(features: number[]): number {
    // Placeholder implementation
    return Math.random();
  }
}