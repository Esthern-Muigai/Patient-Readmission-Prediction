import { Patient } from '../types/patient';

export const samplePatients: Patient[] = [
  {
    id: "P001",
    age: 78,
    gender: "F",
    race: "Caucasian",
    insurance_type: "Medicare",
    admission_date: "2024-01-15T08:30:00Z",
    discharge_date: "2024-01-22T14:00:00Z",
    length_of_stay: 7,
    primary_diagnosis: "Acute myocardial infarction",
    secondary_diagnoses: ["Type 2 diabetes", "Hypertension", "Chronic kidney disease"],
    procedures: ["Cardiac catheterization", "Percutaneous coronary intervention"],
    medications: ["Metoprolol", "Lisinopril", "Atorvastatin", "Metformin", "Aspirin", "Clopidogrel"],
    lab_results: [
      { test_name: "Troponin I", value: 15.2, unit: "ng/mL", reference_range: "0-0.04", abnormal: true },
      { test_name: "Creatinine", value: 1.8, unit: "mg/dL", reference_range: "0.6-1.2", abnormal: true },
      { test_name: "HbA1c", value: 8.5, unit: "%", reference_range: "4.0-5.6", abnormal: true },
      { test_name: "LDL", value: 165, unit: "mg/dL", reference_range: "0-100", abnormal: true }
    ],
    vital_signs: {
      systolic_bp: 145,
      diastolic_bp: 88,
      heart_rate: 92,
      temperature: 98.6,
      respiratory_rate: 18,
      oxygen_saturation: 94
    },
    comorbidities: ["myocardial_infarction", "diabetes", "chronic_pulmonary_disease", "renal_disease"],
    previous_admissions: 3,
    emergency_admission: true,
    discharge_disposition: "Home",
    social_factors: {
      marital_status: "Widowed",
      living_situation: "Alone",
      support_system: "Limited",
      transportation_access: false,
      language_barrier: false
    }
  },
  {
    id: "P002",
    age: 45,
    gender: "M",
    race: "African American",
    insurance_type: "Private",
    admission_date: "2024-01-18T16:45:00Z",
    discharge_date: "2024-01-20T10:30:00Z",
    length_of_stay: 2,
    primary_diagnosis: "Pneumonia",
    secondary_diagnoses: ["Asthma"],
    procedures: ["Chest X-ray", "Blood culture"],
    medications: ["Azithromycin", "Albuterol", "Prednisone"],
    lab_results: [
      { test_name: "WBC", value: 12.5, unit: "K/uL", reference_range: "4.5-11.0", abnormal: true },
      { test_name: "Procalcitonin", value: 2.1, unit: "ng/mL", reference_range: "0-0.25", abnormal: true }
    ],
    vital_signs: {
      systolic_bp: 128,
      diastolic_bp: 82,
      heart_rate: 88,
      temperature: 101.2,
      respiratory_rate: 22,
      oxygen_saturation: 96
    },
    comorbidities: ["chronic_pulmonary_disease"],
    previous_admissions: 0,
    emergency_admission: false,
    discharge_disposition: "Home",
    social_factors: {
      marital_status: "Married",
      living_situation: "With family",
      support_system: "Strong",
      transportation_access: true,
      language_barrier: false
    }
  },
  {
    id: "P003",
    age: 82,
    gender: "M",
    race: "Hispanic",
    insurance_type: "Medicare",
    admission_date: "2024-01-10T22:15:00Z",
    discharge_date: "2024-01-25T11:00:00Z",
    length_of_stay: 15,
    primary_diagnosis: "Congestive heart failure exacerbation",
    secondary_diagnoses: ["Atrial fibrillation", "Chronic kidney disease", "Type 2 diabetes", "COPD"],
    procedures: ["Echocardiogram", "Cardiac catheterization", "Diuresis"],
    medications: ["Furosemide", "Metoprolol", "Warfarin", "Lisinopril", "Insulin", "Digoxin", "Albuterol"],
    lab_results: [
      { test_name: "BNP", value: 1850, unit: "pg/mL", reference_range: "0-100", abnormal: true },
      { test_name: "Creatinine", value: 2.3, unit: "mg/dL", reference_range: "0.6-1.2", abnormal: true },
      { test_name: "INR", value: 3.2, unit: "", reference_range: "2.0-3.0", abnormal: true }
    ],
    vital_signs: {
      systolic_bp: 110,
      diastolic_bp: 65,
      heart_rate: 105,
      temperature: 98.4,
      respiratory_rate: 24,
      oxygen_saturation: 92
    },
    comorbidities: ["congestive_heart_failure", "diabetes", "chronic_pulmonary_disease", "renal_disease"],
    previous_admissions: 5,
    emergency_admission: true,
    discharge_disposition: "SNF",
    social_factors: {
      marital_status: "Married",
      living_situation: "With spouse",
      support_system: "Moderate",
      transportation_access: true,
      language_barrier: true
    }
  },
  {
    id: "P004",
    age: 35,
    gender: "F",
    race: "Asian",
    insurance_type: "Private",
    admission_date: "2024-01-20T14:20:00Z",
    discharge_date: "2024-01-21T16:45:00Z",
    length_of_stay: 1,
    primary_diagnosis: "Appendicitis",
    secondary_diagnoses: [],
    procedures: ["Laparoscopic appendectomy"],
    medications: ["Morphine", "Ondansetron", "Cefazolin"],
    lab_results: [
      { test_name: "WBC", value: 14.2, unit: "K/uL", reference_range: "4.5-11.0", abnormal: true },
      { test_name: "CRP", value: 45, unit: "mg/L", reference_range: "0-3", abnormal: true }
    ],
    vital_signs: {
      systolic_bp: 118,
      diastolic_bp: 75,
      heart_rate: 78,
      temperature: 99.8,
      respiratory_rate: 16,
      oxygen_saturation: 99
    },
    comorbidities: [],
    previous_admissions: 0,
    emergency_admission: true,
    discharge_disposition: "Home",
    social_factors: {
      marital_status: "Single",
      living_situation: "With roommates",
      support_system: "Strong",
      transportation_access: true,
      language_barrier: false
    }
  },
  {
    id: "P005",
    age: 67,
    gender: "M",
    race: "Caucasian",
    insurance_type: "Medicare",
    admission_date: "2024-01-12T09:00:00Z",
    discharge_date: "2024-01-19T15:30:00Z",
    length_of_stay: 7,
    primary_diagnosis: "Stroke (ischemic)",
    secondary_diagnoses: ["Hypertension", "Hyperlipidemia", "Atrial fibrillation"],
    procedures: ["CT scan", "MRI", "Carotid ultrasound"],
    medications: ["Aspirin", "Atorvastatin", "Metoprolol", "Warfarin", "Lisinopril"],
    lab_results: [
      { test_name: "INR", value: 1.8, unit: "", reference_range: "2.0-3.0", abnormal: true },
      { test_name: "LDL", value: 145, unit: "mg/dL", reference_range: "0-100", abnormal: true }
    ],
    vital_signs: {
      systolic_bp: 165,
      diastolic_bp: 95,
      heart_rate: 95,
      temperature: 98.2,
      respiratory_rate: 18,
      oxygen_saturation: 97
    },
    comorbidities: ["cerebrovascular_disease"],
    previous_admissions: 1,
    emergency_admission: true,
    discharge_disposition: "Rehabilitation",
    social_factors: {
      marital_status: "Married",
      living_situation: "With spouse",
      support_system: "Strong",
      transportation_access: true,
      language_barrier: false
    }
  }
];