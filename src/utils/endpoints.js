export const endpoints = (operationId, param) => {
  const baseUrl = 'http://localhost:3001/api';

  const endpointsList = {
    curriculum: baseUrl + `/curriculums/${param}`,
    learningUnit: baseUrl + `/learning_units/${param}`,
    resource: baseUrl + `/resources/${param}`,
    curriculumLearningUnits: baseUrl + `/curriculums/${param}/learning_units`,
    isLearningUnitCompleted: baseUrl + `/learning_units/${param}/is_completed`,
    putLearningUnitCompleted: baseUrl + `/learning_units/${param}/completed_learning_unit`,
    learningUnitResources: baseUrl + `/learning_units/${param}/resources`,
    getResourceEvaluation: baseUrl + `/resources/${param}/resource_evaluation`, // average replace
    updateResourceEvaluation: baseUrl + `/resources/${param}/resource_evaluation`,
  };

  return endpointsList[operationId];
};
