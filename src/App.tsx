import React, { useState } from 'react';
import { Brain, Database, Shield, AlertTriangle, Target, Users, TrendingUp, Lock, Activity } from 'lucide-react';
import { PredictionDashboard } from './components/PredictionDashboard';
import { samplePatients } from './data/samplePatients';

function App() {
  const [activeView, setActiveView] = useState<'analysis' | 'system'>('system');
  const [activeSection, setActiveSection] = useState('problem-scope');

  const sections = [
    { id: 'problem-scope', title: 'Problem Scope', icon: Target },
    { id: 'data-strategy', title: 'Data Strategy', icon: Database },
    { id: 'model-development', title: 'Model Development', icon: Brain },
    { id: 'deployment', title: 'Deployment', icon: TrendingUp },
    { id: 'optimization', title: 'Optimization', icon: AlertTriangle },
    { id: 'ethics-bias', title: 'Ethics & Bias', icon: Shield },
    { id: 'trade-offs', title: 'Trade-offs', icon: Users }
  ];

  const confusionMatrix = {
    tp: 85, // True Positives
    fp: 15, // False Positives
    fn: 25, // False Negatives
    tn: 375 // True Negatives
  };

  const precision = (confusionMatrix.tp / (confusionMatrix.tp + confusionMatrix.fp)).toFixed(3);
  const recall = (confusionMatrix.tp / (confusionMatrix.tp + confusionMatrix.fn)).toFixed(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Hospital Readmission Risk Prediction AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('analysis')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeView === 'analysis'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Analysis
              </button>
              <button
                onClick={() => setActiveView('system')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeView === 'system'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Live System
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">Comprehensive analysis of an AI system for predicting 30-day patient readmission risk</p>
        </div>
      </div>

      {activeView === 'system' ? (
        <PredictionDashboard patients={samplePatients} />
      ) : (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {activeSection === 'problem-scope' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Problem Scope (5 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Problem Definition</h3>
                      <p className="text-blue-800">
                        Develop a predictive AI system to identify patients at high risk of unplanned readmission 
                        within 30 days of discharge, enabling proactive intervention and improved patient outcomes.
                      </p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Objectives</h3>
                      <ul className="text-green-800 space-y-2">
                        <li>• Reduce 30-day readmission rates by 20%</li>
                        <li>• Improve patient outcomes through early intervention</li>
                        <li>• Reduce healthcare costs associated with preventable readmissions</li>
                        <li>• Optimize resource allocation for high-risk patients</li>
                        <li>• Support clinical decision-making at discharge</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Key Stakeholders</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-purple-800 mb-2">Primary Stakeholders</h4>
                          <ul className="text-purple-700 space-y-1">
                            <li>• Patients and families</li>
                            <li>• Attending physicians</li>
                            <li>• Nurses and care teams</li>
                            <li>• Discharge planners</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800 mb-2">Secondary Stakeholders</h4>
                          <ul className="text-purple-700 space-y-1">
                            <li>• Hospital administrators</li>
                            <li>• Insurance companies</li>
                            <li>• Quality improvement teams</li>
                            <li>• IT departments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'data-strategy' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Data Strategy (10 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Data Sources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Clinical Data</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Electronic Health Records (EHR)</li>
                            <li>• Lab results and vital signs</li>
                            <li>• Medication history</li>
                            <li>• Diagnosis codes (ICD-10)</li>
                            <li>• Procedure codes (CPT)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Administrative Data</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Demographics (age, gender, race)</li>
                            <li>• Insurance information</li>
                            <li>• Length of stay</li>
                            <li>• Discharge disposition</li>
                            <li>• Previous admissions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Ethical Concerns</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-red-100 p-2 rounded-full">
                            <Lock className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-red-800">Patient Privacy & Data Security</h4>
                            <p className="text-red-700 mt-1">
                              Ensuring PHI (Protected Health Information) is properly de-identified, encrypted, 
                              and access-controlled throughout the ML pipeline. Risk of data breaches exposing 
                              sensitive medical information.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-red-100 p-2 rounded-full">
                            <Shield className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-red-800">Algorithmic Bias & Health Disparities</h4>
                            <p className="text-red-700 mt-1">
                              Risk of perpetuating existing healthcare disparities by training on biased historical 
                              data. Could lead to unfair treatment of minority populations or socioeconomically 
                              disadvantaged patients.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Preprocessing Pipeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">1</div>
                          <div>
                            <h4 className="font-medium text-green-800">Data Cleaning & Validation</h4>
                            <p className="text-green-700 text-sm">Remove duplicates, handle missing values, validate data types</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">2</div>
                          <div>
                            <h4 className="font-medium text-green-800">Feature Engineering</h4>
                            <p className="text-green-700 text-sm">Create composite scores (Charlson Comorbidity Index), extract temporal features, encode categorical variables</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">3</div>
                          <div>
                            <h4 className="font-medium text-green-800">Normalization & Scaling</h4>
                            <p className="text-green-700 text-sm">Standardize numerical features, normalize lab values to reference ranges</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">4</div>
                          <div>
                            <h4 className="font-medium text-green-800">Feature Selection</h4>
                            <p className="text-green-700 text-sm">Apply statistical tests, correlation analysis, and domain expertise to select relevant features</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'model-development' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Model Development (10 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Model Selection: Random Forest</h3>
                      <div className="space-y-3">
                        <h4 className="font-medium text-blue-800">Justification:</h4>
                        <ul className="text-blue-700 space-y-2">
                          <li>• <strong>Interpretability:</strong> Provides feature importance scores crucial for clinical decision-making</li>
                          <li>• <strong>Handles Mixed Data:</strong> Effectively processes both numerical and categorical features</li>
                          <li>• <strong>Robust to Outliers:</strong> Less sensitive to extreme values in medical data</li>
                          <li>• <strong>Non-linear Relationships:</strong> Captures complex interactions between medical variables</li>
                          <li>• <strong>Regulatory Compliance:</strong> Easier to explain to regulatory bodies compared to black-box models</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confusion Matrix (Hypothetical Results)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-medium text-gray-800 mb-3">Confusion Matrix</h4>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div></div>
                              <div className="font-medium text-sm">Pred: No</div>
                              <div className="font-medium text-sm">Pred: Yes</div>
                              <div className="font-medium text-sm">Actual: No</div>
                              <div className="bg-green-100 text-green-800 p-2 rounded font-bold">{confusionMatrix.tn}</div>
                              <div className="bg-red-100 text-red-800 p-2 rounded font-bold">{confusionMatrix.fp}</div>
                              <div className="font-medium text-sm">Actual: Yes</div>
                              <div className="bg-red-100 text-red-800 p-2 rounded font-bold">{confusionMatrix.fn}</div>
                              <div className="bg-green-100 text-green-800 p-2 rounded font-bold">{confusionMatrix.tp}</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="bg-white p-4 rounded-lg border">
                            <h4 className="font-medium text-gray-800 mb-3">Performance Metrics</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Precision:</span>
                                <span className="font-bold text-blue-600">{precision} (85.0%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Recall:</span>
                                <span className="font-bold text-blue-600">{recall} (77.3%)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">F1-Score:</span>
                                <span className="font-bold text-blue-600">0.810</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Interpretation:</strong> High precision (85%) indicates low false positive rate, while good recall (77.3%) 
                        ensures we capture most at-risk patients. The balanced F1-score (0.810) demonstrates strong overall performance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'deployment' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Deployment (10 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Integration Steps</h3>
                      <div className="space-y-4">
                        {[
                          {
                            step: 1,
                            title: "EHR Integration",
                            description: "Develop APIs to extract patient data from existing EHR systems (Epic, Cerner, etc.)"
                          },
                          {
                            step: 2,
                            title: "Real-time Pipeline",
                            description: "Create data pipeline for real-time feature extraction and model scoring"
                          },
                          {
                            step: 3,
                            title: "Clinical Workflow Integration",
                            description: "Embed risk scores into discharge planning workflow and clinical decision support"
                          },
                          {
                            step: 4,
                            title: "Alert System",
                            description: "Implement automated alerts for high-risk patients with recommended interventions"
                          },
                          {
                            step: 5,
                            title: "Monitoring Dashboard",
                            description: "Deploy monitoring dashboard for model performance tracking and clinical outcomes"
                          }
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-3">
                            <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {item.step}
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800">{item.title}</h4>
                              <p className="text-blue-700 text-sm mt-1">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">HIPAA Compliance Strategy</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">Technical Safeguards</h4>
                          <ul className="text-green-700 space-y-1">
                            <li>• End-to-end encryption for data in transit and at rest</li>
                            <li>• Role-based access controls (RBAC)</li>
                            <li>• Audit logging for all data access</li>
                            <li>• Secure APIs with authentication tokens</li>
                            <li>• Regular security vulnerability assessments</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">Administrative Safeguards</h4>
                          <ul className="text-green-700 space-y-1">
                            <li>• Business Associate Agreements (BAAs)</li>
                            <li>• Staff training on PHI handling</li>
                            <li>• Incident response procedures</li>
                            <li>• Data retention and disposal policies</li>
                            <li>• Regular compliance audits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'optimization' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Optimization (5 points)</h2>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-4">Addressing Overfitting: Cross-Validation with Temporal Splits</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Method Description</h4>
                        <p className="text-orange-700">
                          Implement time-based cross-validation where training data comes from earlier time periods 
                          and validation data from later periods. This prevents data leakage and ensures the model 
                          generalizes to future patients.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Implementation Strategy</h4>
                        <ul className="text-orange-700 space-y-1">
                          <li>• Use rolling window approach with 12-month training periods</li>
                          <li>• Validate on subsequent 3-month periods</li>
                          <li>• Apply early stopping based on validation performance</li>
                          <li>• Use regularization techniques (L1/L2) for feature selection</li>
                          <li>• Monitor performance degradation over time</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-800 mb-2">Benefits</h4>
                        <ul className="text-orange-700 space-y-1">
                          <li>• Realistic assessment of model performance on future data</li>
                          <li>• Accounts for temporal changes in patient populations</li>
                          <li>• Reduces risk of overfitting to historical patterns</li>
                          <li>• Enables detection of model drift over time</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'ethics-bias' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Ethics & Bias (10 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Impact of Biased Training Data</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h4 className="font-medium text-red-800 mb-2">Potential Consequences</h4>
                          <ul className="text-red-700 space-y-2">
                            <li>• <strong>Disparate Impact:</strong> Model may systematically under-predict risk for minority populations, leading to inadequate post-discharge support</li>
                            <li>• <strong>Perpetuating Inequities:</strong> Historical biases in healthcare access and quality could be reinforced by the AI system</li>
                            <li>• <strong>Socioeconomic Bias:</strong> Patients from lower socioeconomic backgrounds may be misclassified due to different healthcare utilization patterns</li>
                            <li>• <strong>Geographic Disparities:</strong> Rural vs urban patient differences may not be adequately captured</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-red-200">
                          <h4 className="font-medium text-red-800 mb-2">Clinical Impact</h4>
                          <p className="text-red-700">
                            Biased predictions could result in inadequate discharge planning for vulnerable populations, 
                            potentially increasing actual readmission rates and worsening health outcomes for already 
                            disadvantaged groups.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Bias Mitigation Strategy: Fairness-Aware Model Training</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Equalized Odds Constraint</h4>
                          <p className="text-green-700 mb-2">
                            Implement algorithmic fairness techniques that ensure equal true positive and false positive 
                            rates across demographic groups (race, gender, age, insurance type).
                          </p>
                          <ul className="text-green-700 space-y-1">
                            <li>• Use adversarial debiasing during training</li>
                            <li>• Apply demographic parity constraints</li>
                            <li>• Implement post-processing calibration by group</li>
                            <li>• Regular bias audits with fairness metrics</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2">Implementation Steps</h4>
                          <ol className="text-green-700 space-y-1">
                            <li>1. Establish fairness metrics and thresholds</li>
                            <li>2. Collect sensitive attributes for bias testing</li>
                            <li>3. Implement fairness constraints in model training</li>
                            <li>4. Validate fairness across all demographic groups</li>
                            <li>5. Monitor fairness metrics in production</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'trade-offs' && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Trade-offs (10 points)</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Model Interpretability vs. Accuracy</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800 mb-2">Interpretability Benefits</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Clinical trust and adoption</li>
                            <li>• Regulatory compliance</li>
                            <li>• Actionable insights for intervention</li>
                            <li>• Bias detection and correction</li>
                            <li>• Medical-legal defensibility</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800 mb-2">Accuracy Benefits</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Better patient outcomes</li>
                            <li>• Reduced false positives/negatives</li>
                            <li>• Cost savings from fewer readmissions</li>
                            <li>• Competitive advantage</li>
                            <li>• Complex pattern recognition</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-blue-200 mt-4">
                        <h4 className="font-medium text-blue-800 mb-2">Healthcare Recommendation</h4>
                        <p className="text-blue-700">
                          In healthcare, interpretability should be prioritized over marginal accuracy gains. 
                          A model that clinicians understand and trust will be more likely to be adopted and 
                          lead to better patient outcomes than a black-box model with slightly higher accuracy.
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-900 mb-4">Limited Computational Resources Impact</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-800 mb-2">Model Choice Constraints</h4>
                          <ul className="text-purple-700 space-y-1">
                            <li>• Favor simpler models: Logistic Regression, Decision Trees</li>
                            <li>• Avoid computationally intensive models: Deep Neural Networks, Large Ensembles</li>
                            <li>• Use feature selection to reduce dimensionality</li>
                            <li>• Implement model compression techniques</li>
                            <li>• Consider cloud-based inference for complex models</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-800 mb-2">Optimization Strategies</h4>
                          <ul className="text-purple-700 space-y-1">
                            <li>• Batch processing for non-urgent predictions</li>
                            <li>• Caching frequently accessed predictions</li>
                            <li>• Model quantization for faster inference</li>
                            <li>• Distributed computing for training</li>
                            <li>• Regular model pruning and optimization</li>
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-800 mb-2">Recommended Approach</h4>
                          <p className="text-purple-700">
                            Start with a simple, interpretable model like Logistic Regression that can run efficiently 
                            on limited hardware. This ensures reliable performance while building clinical trust. 
                            Gradually upgrade to more complex models as computational resources improve.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;