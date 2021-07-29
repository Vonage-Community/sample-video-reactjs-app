import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MuteAudioButton from 'components/MuteAudioButton';
import MuteVideoButton from 'components/MuteVideoButton';
import RecordingButton from 'components/RecordingButton';
import SettingsButton from 'components/SettingsButton';
import MuteAll from 'components/MuteAllButton';
import ScreenSharingButton from 'components/ScreenSharingButton';
import EndCallButton from 'components/EndCallButton';
import styles from './styles';
import { useParams } from 'react-router';

import InfoIconButton from 'components/InfoIconButton';

export default function ToolBar({
  room,
  participants,
  connected,
  cameraPublishing
}) {
  const { roomName } = useParams();
  const { push } = useHistory();
  const [hasAudio, setHasAudio] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);
  const [areAllMuted, setAllMuted] = useState(false);
  const classes = styles();
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);

  const handleMuteAll = () => {
    if (!areAllMuted) {
      participants.map(participant => participant.camera.disableAudio());

      setAllMuted(true);
    } else {
      participants.map(participant => participant.camera.enableAudio());
      setAllMuted(false);
    }
  };
  const toggleVideo = () => {
    if (room && room.camera) {
      const { camera } = room;
      const isVideoEnabled = camera.isVideoEnabled();
      if (isVideoEnabled) {
        camera.disableVideo();
        setHasVideo(false);
      } else {
        camera.enableVideo();
        setHasVideo(true);
      }
    }
  };
  const toggleAudio = () => {
    if (room && room.camera) {
      const camera = room.camera;
      const isAudioEnabled = camera.isAudioEnabled();
      if (isAudioEnabled) {
        camera.disableAudio();
        setHasAudio(false);
      } else {
        camera.enableAudio();
        setHasAudio(true);
      }
    }
  };

  const getVideoSource = () => {
    if (room && room.camera) {
      return room.camera.getVideoDevice();
    }
  };

  const changeVideoSource = videoId => {
    room.camera.setVideoDevice(videoId);
  };
  const changeAudioSource = audioId => {
    room.camera.setAudioDevice(audioId);
  };

  const getAudioSource = async () => {
    if (room && room.camera) {
      const audioDevice = await room.camera.getAudioDevice();
      return audioDevice.deviceId;
    }
  };

  const endCall = () => {
    if (room) {
      push(`${roomName}/${room.roomId}/end`);
      room.leave();
    }
  };

  useEffect(() => {
    console.log('[toolbar] useEffect - Connected', connected);
    if (connected) {
      const isAudioEnabled =
        room && room.camera && room.camera.isAudioEnabled() ? true : false;
      const isVideoEnabled =
        room && room.camera && room.camera.isVideoEnabled() ? true : false;
      setHasAudio(isAudioEnabled);
      setHasVideo(isVideoEnabled);
    }
  }, [connected, room]);

  return (
    <div className={classes.toolbarContainer}>
      <InfoIconButton classes={classes} />
      <MuteAudioButton
        toggleAudio={toggleAudio}
        hasAudio={hasAudio}
        classes={classes}
        changeAudioSource={changeAudioSource}
        getAudioSource={getAudioSource}
        cameraPublishing={cameraPublishing}
      />
      <MuteVideoButton
        toggleVideo={toggleVideo}
        hasVideo={hasVideo}
        classes={classes}
        getVideoSource={getVideoSource}
        cameraPublishing={cameraPublishing}
        changeVideoSource={changeVideoSource}
      />
      <RecordingButton room={room} classes={classes} />
      <ScreenSharingButton room={room} classes={classes} />
      <MuteAll
        handleMuteAll={handleMuteAll}
        areAllMuted={areAllMuted}
        classes={classes}
      />
      <SettingsButton classes={classes} room={room} />
      <EndCallButton classes={classes} handleEndCall={endCall} />
    </div>
  );
}
