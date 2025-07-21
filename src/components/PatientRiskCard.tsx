import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar,
  Activity,
  Heart,
  Pill
} from 'lucide-react';
import { PredictionResult, Patient } from '../types/patient';

interface PatientRiskCardProps {
  prediction: PredictionResult;
  patient?: Patient;
  onViewDetails: () => void;
}

export const PatientRiskCard: React.FC<PatientRiskCardProps> = ({
  prediction,
  patient,
  onViewDetails
}) => {
  const getRiskColor = (category: string) => {
    switch (category) {
      case 'High': return 'red';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'High': return AlertTriangle;
      case 'Medium': return Clock;
      case 'Low': return CheckCircle;
      default: return Activity;
    }
  };

  const color = getRiskColor(prediction.risk_category);
  const RiskIcon = getRiskIcon(prediction.risk_category);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`bg-${color}-100 p-2 rounded-full`}>
              <RiskIcon className={`w-5 h-5 text-${color}-600`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Patient {prediction.patient_id}
              </h3>
              <p className={`text-sm font-medium text-${color}-600`}>
                {prediction.risk_category} Risk
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold text-${color}-600`}>
              {(prediction.risk_score * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-gray-500">
              {(prediction.confidence * 100).toFixed(0)}% confidence
            </p>
          </div>
        </div>

        {/* Patient Info */}
        {patient && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {patient.age}y, {patient.gender}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                LOS: {patient.length_of_stay}d
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {patient.comorbidities.length} comorbidities
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {patient.medications.length} medications
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Risk Factors */}
      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-3">Top Risk Factors</h4>
        <div className="space-y-2">
          {prediction.contributing_factors.slice(0, 3).map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{factor.factor}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${color}-500 h-2 rounded-full`}
                    style={{ width: `${factor.importance * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {(factor.importance * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6 bg-gray-50 rounded-b-xl">
        <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
        <div className="space-y-1">
          {prediction.recommendations.slice(0, 2).map((rec, index) => (
            <p key={index} className="text-sm text-gray-600">
              • {rec}
            </p>
          ))}
          {prediction.recommendations.length > 2 && (
            <p className="text-sm text-gray-500">
              +{prediction.recommendations.length - 2} more recommendations
            </p>
          )}
        </div>
        
        <button
          onClick={onViewDetails}
          className={`mt-4 w-full bg-${color}-600 text-white py-2 px-4 rounded-lg hover:bg-${color}-700 transition-colors text-sm font-medium`}
        >
          View Full Assessment
        </button>
      </div>
    </div>
  );
};