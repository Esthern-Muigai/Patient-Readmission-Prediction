export interface Patient {
  id: string;
  age: number;
  gender: 'M' | 'F';
  race: string;
  insurance_type: string;
  admission_date: string;
  discharge_date: string;
  length_of_stay: number;
  primary_diagnosis: string;
  secondary_diagnoses: string[];
  procedures: string[];
  medications: string[];
  lab_results: LabResult[];
  vital_signs: VitalSigns;
  comorbidities: string[];
  previous_admissions: number;
  emergency_admission: boolean;
  discharge_disposition: string;
  social_factors: SocialFactors;
}

export interface LabResult {
  test_name: string;
  value: number;
  unit: string;
  reference_range: string;
  abnormal: boolean;
}

export interface VitalSigns {
  systolic_bp: number;
  diastolic_bp: number;
  heart_rate: number;
  temperature: number;
  respiratory_rate: number;
  oxygen_saturation: number;
}

export interface SocialFactors {
  marital_status: string;
  living_situation: string;
  support_system: string;
  transportation_access: boolean;
  language_barrier: boolean;
}

export interface PredictionResult {
  patient_id: string;
  risk_score: number;
  risk_category: 'Low' | 'Medium' | 'High';
  confidence: number;
  contributing_factors: ContributingFactor[];
  recommendations: string[];
  prediction_date: string;
}

export interface ContributingFactor {
  factor: string;
  importance: number;
  description: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  auc_roc: number;
  confusion_matrix: number[][];
}