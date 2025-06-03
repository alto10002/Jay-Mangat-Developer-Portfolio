import { Modal, Box, Button } from '@mui/material';

const VideoModal = ({ open, handleClose, videoSrc }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '800px' }
      }}>
        <Button onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>X</Button>
        <video width="100%" controls autoPlay>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Modal>
  );
};

export default VideoModal;