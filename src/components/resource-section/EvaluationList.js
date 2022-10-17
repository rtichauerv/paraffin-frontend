import { OrderList } from 'primereact/orderlist';
import { Avatar } from 'primereact/avatar';
import { Rating } from 'primereact/rating';
import styles from '@styles/ResourceEvaluations.module.scss';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import useUsers from '../../hooks/useCurrentUser';
import useGet from '@hooks/useGet';
import { endpoints } from '@utils/endpoints';

const EvaluationList = ({ evaluationsData }) => {
  const user = useUsers();

  const { data: dataResourceEvaluation, isLoading, isError, mutate } = useGet(endpoints('getResourceEvaluation', 1));

  const itemTemplate = (evaluation) => {
    return (
      <Card className={styles.cardFull}>
        <div className={styles.commentCard}>
          <div className={styles.commentUserInfo}>
            <Avatar label={user.name} size="large" />
            <Rating value={evaluation.average_evaluation} stars={5} cancel={false} readOnly="true" />
          </div>
          <div className={styles.rating}>
            <h5 className="mb-2">{user.name + ' dice: '}</h5>
            <InputTextarea value={evaluation.comment} disabled={true} rows={4} cols={50}></InputTextarea>
          </div>
        </div>
      </Card>
    );
  };

  return <OrderList value={[evaluationsData]} itemTemplate={itemTemplate} header="Comentarios"></OrderList>;
};

export default EvaluationList;
