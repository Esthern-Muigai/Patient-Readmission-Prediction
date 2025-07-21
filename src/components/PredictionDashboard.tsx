import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Activity,
  Heart,
  Calendar,
  FileText,
  Shield
} from 'lucide-react';
import { PredictionResult, Patient, ModelMetrics } from '../types/patient';
import { DataPreprocessor } from '../utils/dataPreprocessing';
import { ReadmissionPredictor } from '../utils/readmissionModel';
import { PatientRiskCard } from './PatientRiskCard';
import { ModelPerformance } from './ModelPerformance';

interface PredictionDashboardProps {
  patients: Patient[];
}

export const PredictionDashboard: React.FC<PredictionDashboardProps> = ({ patients }) => {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'performance'>('dashboard');

  const predictor = new ReadmissionPredictor();

  useEffect(() => {
    generatePredictions();
    setModelMetrics(predictor.getModelMetrics());
  }, [patients]);

  const generatePredictions = async () => {
    setLoading(true);
    try {
      const newPredictions = patients.map(patient => {
        const features = DataPreprocessor.preprocessPatient(patient);
        return predictor.predict({ ...features, patient_id: patient.id });
      });
      setPredictions(newPredictions);
    } catch (error) {
      console.error('Error generating predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const riskCounts = predictions.reduce(
    (acc, pred) => {
      acc[pred.risk_category.toLowerCase()]++;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  const averageRiskScore = predictions.length > 0 
    ? predictions.reduce((sum, pred) => sum + pred.risk_score, 0) / predictions.length 
    : 0;

  const highRiskPatients = predictions.filter(p => p.risk_category === 'High');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Readmission Risk Prediction</h1>
                <p className="text-gray-600">AI-powered 30-day readmission risk assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={generatePredictions}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Refresh Predictions'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'patients', label: 'Patient Risk Assessment', icon: Users },
              { id: 'performance', label: 'Model Performance', icon: Shield }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">High Risk</p>
                    <p className="text-2xl font-bold text-red-600">{riskCounts.high}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Medium Risk</p>
                    <p className="text-2xl font-bold text-yellow-600">{riskCounts.medium}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Low Risk</p>
                    <p className="text-2xl font-bold text-green-600">{riskCounts.low}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Risk Score</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {(averageRiskScore * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* High Risk Patients Alert */}
            {highRiskPatients.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">
                    Immediate Attention Required
                  </h3>
                </div>
                <p className="text-red-800 mb-4">
                  {highRiskPatients.length} patient(s) identified as high risk for 30-day readmission.
                  Immediate intervention recommended.
                </p>
                <div className="space-y-2">
                  {highRiskPatients.slice(0, 3).map(patient => (
                    <div key={patient.patient_id} className="bg-white p-3 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Patient ID: {patient.patient_id}</p>
                          <p className="text-sm text-gray-600">
                            Risk Score: {(patient.risk_score * 100).toFixed(1)}% 
                            (Confidence: {(patient.confidence * 100).toFixed(1)}%)
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedPatient(patient.patient_id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Predictions */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Risk Assessments</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {predictions.slice(0, 5).map(prediction => (
                    <div key={prediction.patient_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          prediction.risk_category === 'High' ? 'bg-red-500' :
                          prediction.risk_category === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">Patient {prediction.patient_id}</p>
                          <p className="text-sm text-gray-600">
                            {prediction.risk_category} Risk • {(prediction.risk_score * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(prediction.prediction_date).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => setSelectedPatient(prediction.patient_id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {predictions.map(prediction => (
                <PatientRiskCard
                  key={prediction.patient_id}
                  prediction={prediction}
                  patient={patients.find(p => p.id === prediction.patient_id)}
                  onViewDetails={() => setSelectedPatient(prediction.patient_id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && modelMetrics && (
          <ModelPerformance metrics={modelMetrics} />
        )}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Patient Risk Assessment Details
                </h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Patient details would go here */}
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Detailed patient assessment for Patient ID: {selectedPatient}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Full implementation would show comprehensive risk factors, 
                  recommendations, and intervention tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};