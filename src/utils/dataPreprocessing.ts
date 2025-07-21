import { Patient, LabResult } from '../types/patient';

export class DataPreprocessor {
  
  /**
   * Calculate Charlson Comorbidity Index
   */
  static calculateCharlsonIndex(comorbidities: string[]): number {
    const charlsonWeights: { [key: string]: number } = {
      'myocardial_infarction': 1,
      'congestive_heart_failure': 1,
      'peripheral_vascular_disease': 1,
      'cerebrovascular_disease': 1,
      'dementia': 1,
      'chronic_pulmonary_disease': 1,
      'rheumatic_disease': 1,
      'peptic_ulcer_disease': 1,
      'mild_liver_disease': 1,
      'diabetes': 1,
      'diabetes_complications': 2,
      'hemiplegia': 2,
      'renal_disease': 2,
      'malignancy': 2,
      'moderate_liver_disease': 3,
      'metastatic_carcinoma': 6,
      'aids': 6
    };

    return comorbidities.reduce((score, condition) => {
      return score + (charlsonWeights[condition.toLowerCase().replace(/\s+/g, '_')] || 0);
    }, 0);
  }

  /**
   * Extract temporal features from admission/discharge dates
   */
  static extractTemporalFeatures(admissionDate: string, dischargeDate: string) {
    const admission = new Date(admissionDate);
    const discharge = new Date(dischargeDate);
    
    return {
      admission_day_of_week: admission.getDay(),
      admission_month: admission.getMonth() + 1,
      admission_hour: admission.getHours(),
      discharge_day_of_week: discharge.getDay(),
      discharge_month: discharge.getMonth() + 1,
      discharge_hour: discharge.getHours(),
      is_weekend_admission: admission.getDay() === 0 || admission.getDay() === 6,
      is_weekend_discharge: discharge.getDay() === 0 || discharge.getDay() === 6
    };
  }

  /**
   * Normalize lab values based on reference ranges
   */
  static normalizeLabValues(labResults: LabResult[]): { [key: string]: number } {
    const normalizedLabs: { [key: string]: number } = {};
    
    labResults.forEach(lab => {
      // Simple normalization: (value - min) / (max - min)
      // In real implementation, use proper reference ranges
      const referenceRange = lab.reference_range.split('-').map(v => parseFloat(v.trim()));
      if (referenceRange.length === 2) {
        const [min, max] = referenceRange;
        normalizedLabs[lab.test_name] = (lab.value - min) / (max - min);
      } else {
        normalizedLabs[lab.test_name] = lab.abnormal ? 1 : 0;
      }
    });
    
    return normalizedLabs;
  }

  /**
   * Create medication complexity score
   */
  static calculateMedicationComplexity(medications: string[]): number {
    // High-risk medication categories
    const highRiskMeds = [
      'warfarin', 'insulin', 'digoxin', 'lithium', 'phenytoin',
      'carbamazepine', 'theophylline', 'methotrexate'
    ];
    
    const highRiskCount = medications.filter(med => 
      highRiskMeds.some(risk => med.toLowerCase().includes(risk))
    ).length;
    
    return medications.length + (highRiskCount * 2); // Weight high-risk meds more
  }

  /**
   * Encode categorical variables
   */
  static encodeCategoricalFeatures(patient: Patient) {
    return {
      // Gender encoding
      gender_male: patient.gender === 'M' ? 1 : 0,
      
      // Insurance type encoding (one-hot)
      insurance_medicare: patient.insurance_type === 'Medicare' ? 1 : 0,
      insurance_medicaid: patient.insurance_type === 'Medicaid' ? 1 : 0,
      insurance_private: patient.insurance_type === 'Private' ? 1 : 0,
      insurance_uninsured: patient.insurance_type === 'Uninsured' ? 1 : 0,
      
      // Emergency admission
      emergency_admission: patient.emergency_admission ? 1 : 0,
      
      // Discharge disposition encoding
      discharge_home: patient.discharge_disposition === 'Home' ? 1 : 0,
      discharge_snf: patient.discharge_disposition === 'SNF' ? 1 : 0,
      discharge_rehab: patient.discharge_disposition === 'Rehabilitation' ? 1 : 0,
      discharge_other: !['Home', 'SNF', 'Rehabilitation'].includes(patient.discharge_disposition) ? 1 : 0
    };
  }

  /**
   * Main preprocessing function
   */
  static preprocessPatient(patient: Patient) {
    const charlsonIndex = this.calculateCharlsonIndex(patient.comorbidities);
    const temporalFeatures = this.extractTemporalFeatures(patient.admission_date, patient.discharge_date);
    const normalizedLabs = this.normalizeLabValues(patient.lab_results);
    const medicationComplexity = this.calculateMedicationComplexity(patient.medications);
    const categoricalFeatures = this.encodeCategoricalFeatures(patient);
    
    // Age groups
    const ageGroup = patient.age < 30 ? 0 : patient.age < 50 ? 1 : patient.age < 70 ? 2 : 3;
    
    // Social risk factors
    const socialRiskScore = [
      !patient.social_factors.transportation_access,
      patient.social_factors.language_barrier,
      patient.social_factors.living_situation === 'Alone',
      patient.social_factors.support_system === 'None'
    ].filter(Boolean).length;

    return {
      // Demographics
      age: patient.age,
      age_group: ageGroup,
      
      // Clinical features
      length_of_stay: patient.length_of_stay,
      charlson_comorbidity_index: charlsonIndex,
      previous_admissions: patient.previous_admissions,
      medication_complexity: medicationComplexity,
      num_procedures: patient.procedures.length,
      num_diagnoses: patient.secondary_diagnoses.length + 1, // +1 for primary
      
      // Vital signs
      systolic_bp: patient.vital_signs.systolic_bp,
      diastolic_bp: patient.vital_signs.diastolic_bp,
      heart_rate: patient.vital_signs.heart_rate,
      temperature: patient.vital_signs.temperature,
      respiratory_rate: patient.vital_signs.respiratory_rate,
      oxygen_saturation: patient.vital_signs.oxygen_saturation,
      
      // Social factors
      social_risk_score: socialRiskScore,
      
      // Temporal features
      ...temporalFeatures,
      
      // Categorical features
      ...categoricalFeatures,
      
      // Lab values (normalized)
      ...normalizedLabs
    };
  }
}