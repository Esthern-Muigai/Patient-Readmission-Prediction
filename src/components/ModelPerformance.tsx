import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ModelMetrics } from '../types/patient';
import { TrendingUp, Target, Shield, AlertCircle } from 'lucide-react';

interface ModelPerformanceProps {
  metrics: ModelMetrics;
}

export const ModelPerformance: React.FC<ModelPerformanceProps> = ({ metrics }) => {
  const performanceData = [
    { name: 'Accuracy', value: metrics.accuracy * 100 },
    { name: 'Precision', value: metrics.precision * 100 },
    { name: 'Recall', value: metrics.recall * 100 },
    { name: 'F1-Score', value: metrics.f1_score * 100 }
  ];

  const confusionData = [
    { name: 'True Negatives', value: metrics.confusion_matrix[0][0], color: '#10B981' },
    { name: 'False Positives', value: metrics.confusion_matrix[0][1], color: '#F59E0B' },
    { name: 'False Negatives', value: metrics.confusion_matrix[1][0], color: '#EF4444' },
    { name: 'True Positives', value: metrics.confusion_matrix[1][1], color: '#3B82F6' }
  ];

  const totalPredictions = metrics.confusion_matrix.flat().reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">
                {(metrics.accuracy * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Precision</p>
              <p className="text-2xl font-bold text-green-600">
                {(metrics.precision * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recall</p>
              <p className="text-2xl font-bold text-purple-600">
                {(metrics.recall * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">AUC-ROC</p>
              <p className="text-2xl font-bold text-orange-600">
                {(metrics.auc_roc * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Metrics Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Score']} />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Confusion Matrix */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Confusion Matrix</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div></div>
            <div className="text-center font-medium text-gray-700">Predicted No</div>
            <div className="text-center font-medium text-gray-700">Predicted Yes</div>
            
            <div className="font-medium text-gray-700">Actual No</div>
            <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-bold">
              {metrics.confusion_matrix[0][0]}
              <div className="text-xs text-green-600">True Negatives</div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center font-bold">
              {metrics.confusion_matrix[0][1]}
              <div className="text-xs text-yellow-600">False Positives</div>
            </div>
            
            <div className="font-medium text-gray-700">Actual Yes</div>
            <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center font-bold">
              {metrics.confusion_matrix[1][0]}
              <div className="text-xs text-red-600">False Negatives</div>
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center font-bold">
              {metrics.confusion_matrix[1][1]}
              <div className="text-xs text-blue-600">True Positives</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>Total Predictions: {totalPredictions.toLocaleString()}</p>
            <p>Sensitivity (Recall): {(metrics.recall * 100).toFixed(1)}%</p>
            <p>Specificity: {((metrics.confusion_matrix[0][0] / (metrics.confusion_matrix[0][0] + metrics.confusion_matrix[0][1])) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Model Interpretation */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Model Interpretation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Strengths</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• High precision ({(metrics.precision * 100).toFixed(1)}%) minimizes false alarms</li>
                <li>• Good recall ({(metrics.recall * 100).toFixed(1)}%) captures most at-risk patients</li>
                <li>• Strong AUC-ROC ({(metrics.auc_roc * 100).toFixed(1)}%) indicates excellent discrimination</li>
                <li>• Balanced performance across risk categories</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Areas for Improvement</h4>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Monitor for potential bias across demographic groups</li>
                <li>• Regular retraining needed to maintain performance</li>
                <li>• Consider ensemble methods for improved accuracy</li>
                <li>• Validate performance on external datasets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Impact */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Clinical Impact Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round(metrics.confusion_matrix[1][1] / (metrics.confusion_matrix[1][1] + metrics.confusion_matrix[1][0]) * 100)}%
            </div>
            <p className="text-sm text-blue-800">High-risk patients identified</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round(metrics.confusion_matrix[0][1] / totalPredictions * 100)}%
            </div>
            <p className="text-sm text-blue-800">False positive rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round(metrics.confusion_matrix[1][0] / totalPredictions * 100)}%
            </div>
            <p className="text-sm text-blue-800">Missed high-risk cases</p>
          </div>
        </div>
      </div>
    </div>
  );
};