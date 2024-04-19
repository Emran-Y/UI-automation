import  { useCallback, useRef, useState, CSSProperties } from 'react';
import { toPng } from 'html-to-image';
import './App.css';
import { styleOne } from './styles';
import { styleTwo } from './styles';
import { styleThree } from './styles';
import { styleFour } from './styles';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";



function App() {
  const [curNumber, setCurNumber] = useState(1);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [left,setLeft] = useState(0);
  const [top,setTop] = useState(0);
  const [width,setWidth] = useState(0);
  const [height,setHeight] = useState(0);


 

 

  const flipTo = (cur:number) => {
    setCurNumber(cur);
    if (cur ===1){
      setLeft(parseInt(styleOne.printContainer.left.split('px')[0]));
      setTop(parseInt(styleOne.printContainer.top.split('px')[0]));
    }else if (cur ===2){
      setLeft(parseInt(styleTwo.printContainer.left.split('px')[0]));
      setTop(parseInt(styleTwo.printContainer.top.split('px')[0]));
    }else if (cur ===3){
      setLeft(parseInt(styleThree.printContainer.left.split('px')[0]));
      setTop(parseInt(styleThree.printContainer.top.split('px')[0]));
    }else if (cur ===4){
      setLeft(parseInt(styleFour.printContainer.left.split('px')[0]));
      setTop(parseInt(styleFour.printContainer.top.split('px')[0]));
    }

    if (cur ===1){
      setWidth(parseInt(styleOne.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleOne.printContainer.height.split('px')[0]));
    }else if (cur ===2){
      setWidth(parseInt(styleTwo.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleTwo.printContainer.height.split('px')[0]));
    }
    else if (cur ===3){
      setWidth(parseInt(styleThree.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleThree.printContainer.height.split('px')[0]));
    }
    else if (cur ===4){
      setWidth(parseInt(styleFour.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleFour.printContainer.height.split('px')[0]));
    }
    console.log('curNumber',curNumber);
    console.log('left',left);
    console.log('top',top);
    console.log('width',width);
    console.log('height',height);
  }
  
  

  const onButtonClick = useCallback((cur: number) => {
    if (!ref.current) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `image-${cur}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const handleFileChange = (image: File) => {
    setIsUploading(true);
    const file = image;
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageURL(base64String);
      setTimeout(() => {
        setIsUploaded(true);
        setIsUploading(false);
        setCurNumber(1);
      }
      , 1000);
    };

    reader.readAsDataURL(file);
  };

  const handleLeft = () => {
    setLeft(left - 1);
  };
  const handleRight = () => {
    setLeft(left + 1);
  }

  const handleUp = () => {
    setTop(top - 1);
  }

  const handleDown = () => {
    setTop(top + 1);
  }

  const handleWidthAdd = () => {
    setWidth(width + 1);
  }

  const handleWidthSub = () => {
    setWidth(width - 1);
  }

  const handleHeightAdd = () => {
    setHeight(height + 1);
  }

  const handleHeightSub = () => {
    setHeight(height - 1);
  }

  return (
    <div className='container'>
      {isUploaded ? (
        curNumber === 1 ? (
          <div style={styleOne.bgContainer as CSSProperties} ref={ref}>
            <img src={`/backgrounds/background1.png`} className='bg-image' alt='bg-image' />
            <div style={{
              ...styleOne.printContainer,
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
            } as CSSProperties
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : curNumber === 2 ? (
          <div style={styleTwo.bgContainer as CSSProperties} ref={ref}>
            <div style={styleTwo.printContainer as CSSProperties}>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : curNumber === 3 ? (
          <div style={styleThree.bgContainer as CSSProperties} ref={ref}>
            <div style={styleThree.printContainer as CSSProperties}>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : (
          <div style={styleFour.bgContainer as CSSProperties} ref={ref}>
            <div style={styleFour.printContainer as CSSProperties}>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        )
      ) : (
        <div className='please'>
          upload the print, we can handle generating the images and downloading them for you
        </div>
      )}

      {isUploaded && (
        <div className='main'>
          <div className='num-container'>
            <button onClick={() => flipTo(1)} >1</button>
            <button onClick={() => flipTo(2)} >2</button>
            <button onClick={() => flipTo(3)}>3</button>
            <button  onClick={() => flipTo(4)} >4</button>
          </div>

          <div className='adjuster-cont'>

            <button className='adjuster' onClick={handleLeft}><FaChevronLeft /></button>
            <button className='adjuster' onClick={handleRight}><FaChevronRight /></button>
            <button className='adjuster' onClick={handleUp}><FaChevronUp /></button>
            <button className='adjuster' onClick={handleDown}><FaChevronDown /></button>
            
          </div>

          <div className='dim-adjust'>
            <button onClick={handleWidthAdd} >W +</button>
            <button onClick={handleWidthSub}>W -</button>
            <button onClick={handleHeightAdd}>H +</button>
            <button onClick={handleHeightSub}>H -</button>
          </div>

          <div className='btns'>
            <button className='download-btn' onClick={ () =>   onButtonClick(curNumber)}>Download</button>
          </div>
        </div>
      )}

      {!isUploaded && (
        <>
        <div className='my-input-form'>
          <label htmlFor="profile-pic" className="custom-file-upload">
            Upload Print
          </label>
          <input 
          id='profile-pic'
          type='file'
          accept='image/*'
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          className='fileInput'
          />
          
        </div>
        {isUploading && <div className="lds-hourglass"></div>}
        </>
      )}
    </div>
  );
}

export default App;
