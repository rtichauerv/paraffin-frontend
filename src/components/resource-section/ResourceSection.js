import ResourcePanel from './ResourcePanel';
import EvaluationList from './EvaluationList';
import useGet from '@hooks/useGet';
import { endpoints } from '@utils/endpoints';
import { useRef } from 'react';

const ResourceSection = ({ resourceId }) => {
  const { data: resource, isLoading: isLoadingResource, isError: isErrorResource, mutate: updateResource } = useGet(endpoints('resource', resourceId));

  const { data, isLoading: isLoadingEvaluation, isError: isErrorEvaluation } = useGet(endpoints('resourceEvaluation', resourceId));

  const { data: evaluations, isLoading: isLoadingEvaluations, isError: isErrorEvaluations, mutate: updateEvaluations } = useGet(endpoints('resourceEvaluations', resourceId));

  const toast = useRef(null);

  if (isLoadingResource || isLoadingEvaluations || isLoadingEvaluation) return 'loading';

  if (isErrorResource || isErrorEvaluations || isErrorEvaluation) return 'error';

  const showSuccess = () => toast.current.show({ severity: 'success', summary: 'Tu evaluación quedó registrada', detail: 'Gracias por contribuir!' });

  async function handleSubmitForm(evaluation, comment) {
    if (evaluation < 1) {
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ evaluation: evaluation, comment: comment }),
    };
    const response = await fetch(endpoints('resourceEvaluation', resourceId), requestOptions);
    await response.json();
    updateEvaluations();
    updateResource();
    showSuccess();
  }

  const formOptions = {
    evaluation: data.evaluation,
    comment: data.comment,
    evaluated: data.evaluation ? true : false,
    handleSubmitForm: handleSubmitForm,
    toast: toast,
  };

  return (
    <>
      <ResourcePanel resource={resource} formOptions={formOptions} />
      <EvaluationList evaluationsData={evaluations} />
    </>
  );
};

export default ResourceSection;
