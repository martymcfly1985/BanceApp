import { Button, Card, Drawer, message, Rate, Space, Typography } from "antd";
import { useState } from "react";
import { saveNewRating } from "../../BusinessLogic/courtActions";
import { ICourt } from "../../Models/Court";

const { Title } = Typography;

interface CourtInformationProps {
  selectedCourt: ICourt;
  drawerOpen: boolean;
  onDrawerClose: any;
}

function CourtInformation({
  selectedCourt,
  drawerOpen,
  onDrawerClose
}: CourtInformationProps) {
  const [ratingVisibility, setRatingVisiblity] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const onNewRatingSubmit = async () =>
  {
    try {
      if(selectedCourt.recnum === undefined)
      {
        throw new Error();
      }
      await saveNewRating(newRating, selectedCourt.recnum);
      setRatingVisiblity(false);
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
          {selectedCourt.condition === null ? undefined : <Rate disabled defaultValue={selectedCourt.condition} />}
        </Space>
      }
      width={'70%'}
      open={drawerOpen}
      onClose={() => {
        onDrawerClose();
        setRatingVisiblity(false);
      }}
    >
      <Card>
        <h1>Lights</h1>
        <p>{selectedCourt.lights === false ? 'No' : 'Yes'}</p>
        <h1>Surface</h1>
        <p>{selectedCourt.surface}</p>
      </Card>
      <Card>
        {ratingVisibility === false ? 
          <Button 
            onClick={() => { setRatingVisiblity(true) }}
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
      </Card>
    </Drawer>
  );
}

export default CourtInformation