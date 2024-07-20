import { Button, Card, Drawer, message, Rate, Space, Typography } from "antd";
import { useState } from "react";
import { saveNewRating } from "../../BusinessLogic/courtActions";
import { useUser } from "../../Hooks/useUser";
import { ICourt } from "../../Models/Court";

const { Title } = Typography;

interface CourtInformationProps {
  selectedCourt: ICourt;
  drawerOpen: boolean;
  onDrawerClose(): void;
  updateCourtCondition(newCondition: number, courtRecnum: number, locationRecnum: number): void;
}

function CourtInformation({
  selectedCourt,
  drawerOpen,
  onDrawerClose,
  updateCourtCondition
}: CourtInformationProps) {
  const [ratingVisible, setRatingVisible] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const userInfo = useUser();

  const onNewRatingSubmit = async () => {
    try {
      if (selectedCourt.recnum === undefined || selectedCourt.locationRecnum === undefined) {
        throw new Error();
      }
      const newCondition = await saveNewRating(newRating, selectedCourt.recnum);
      updateCourtCondition(newCondition, selectedCourt.recnum, selectedCourt.locationRecnum);
      setRatingVisible(false);
      setNewRating(0);
      message.success('Thank you for rating this court!');
    } catch {
      message.error('Unable to submit new rating.');
    }
  }

  return (
    <Drawer
      title={
        <Space direction='horizontal' size='large'>
          <Title
            style={{ paddingTop: '12px' }}
            level={2}
          >
            {selectedCourt.name}
          </Title>
          {selectedCourt.condition === null ? undefined : <Rate disabled value={selectedCourt.condition} />}
        </Space>
      }
      width={'70%'}
      open={drawerOpen}
      onClose={() => {
        onDrawerClose();
        setRatingVisible(false);
      }}
    >
      <Card>
        <h1>Lights</h1>
        <p>{selectedCourt.lights === false ? 'No' : 'Yes'}</p>
        <h1>Surface</h1>
        <p>{selectedCourt.surface}</p>
      </Card>
      {userInfo != null ?
        <Card>
          {ratingVisible === false ? 
            <Button 
              onClick={() => { setRatingVisible(true) }}
              type='primary'
            >
              Rate {selectedCourt.name}
            </Button> : 
            <Space direction='horizontal' size='large'>
              <Rate onChange={setNewRating}/>
              <Button 
                type='primary'
                onClick={() => { onNewRatingSubmit() }}
                disabled={newRating === 0}
              >
                Submit Rating
              </Button>
            </Space>
          }
        </Card> : 
        <></>
      }
    </Drawer>
  );
}

export default CourtInformation