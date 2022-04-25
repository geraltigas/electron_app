import { createRef, useRef } from 'react';

interface HoButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeSrc: string;
  imActiveSrc: string;
}

const HoButton = (porps: HoButtonProps) => {
  const { isActive, onClick, activeSrc, imActiveSrc } = porps;
  const selfButton = useRef<HTMLDivElement>(null);
  let image;
  if (selfButton.current != null) {
    if (isActive) {
      selfButton.current.style.animationName = 'change_to_active';
      selfButton.current.style.animationDuration = '0.5s';
      selfButton.current.style.animationFillMode = 'forwards';
      image = <img src={activeSrc} alt="" id="img_HoButton" />;
    } else {
      selfButton.current.style.animationName = 'change_to_imactive';
      selfButton.current.style.animationDuration = '0.5s';
      selfButton.current.style.animationFillMode = 'forwards';
      image = <img src={imActiveSrc} alt="" id="img_HoButton" />;
    }
  }

  return (
    <div className="HoButtonContainer">
      <div className="HoButton" ref={selfButton} onClick={onClick}>
        {image}
      </div>
    </div>
  );
};

export default HoButton;
