import  { useCallback, useRef, useState, CSSProperties } from 'react';
import { toPng } from 'html-to-image';
import './App.css';
import { styleOne } from './styles';
import { styleTwo } from './styles';
import { styleThree } from './styles';
import { styleFour } from './styles';
import { styleFive } from './styles';
import { styleSix } from './styles';
import { styleSeven } from './styles';
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
  const [left,setLeft] = useState(240);
  const [top,setTop] = useState(60);
  const [width,setWidth] = useState(422);
  const [height,setHeight] = useState(602);
  const [value, setValue] = useState(20);
  const [leftLeft, setLeftLeft] = useState(0);
  const [leftTop, setLeftTop] = useState(0);
  const [leftWidth, setLeftWidth] = useState(0);
  const [leftHeight, setLeftHeight] = useState(0);
  const [rightLeft, setRightLeft] = useState(0);
  const [rightTop, setRightTop] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);
  const [rightHeight, setRightHeight] = useState(0);
  const [curEditing, setCurEditing] = useState('left');


 

 

  const flipTo = (cur:number) => {
    setCurNumber(cur);
    if (cur ===1){
      setLeft(parseInt(styleOne.printContainer.left.split('px')[0]));
      setTop(parseInt(styleOne.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleOne.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleOne.printContainer.height.split('px')[0]));
    }else if (cur ===2){
      setLeft(parseInt(styleTwo.printContainer.left.split('px')[0]));
      setTop(parseInt(styleTwo.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleTwo.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleTwo.printContainer.height.split('px')[0]));
    }else if (cur ===3){
      setLeft(parseInt(styleThree.printContainer.left.split('px')[0]));
      setTop(parseInt(styleThree.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleThree.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleThree.printContainer.height.split('px')[0]));
    }else if (cur ===4){
      setLeft(parseInt(styleFour.printContainer.left.split('px')[0]));
      setTop(parseInt(styleFour.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleFour.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleFour.printContainer.height.split('px')[0]));
    }else if (cur ===5){
      setLeft(parseInt(styleFive.printContainer.left.split('px')[0]));
      setTop(parseInt(styleFive.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleFive.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleFive.printContainer.height.split('px')[0]));
    }else if (cur ===6){
      setLeftLeft(parseInt(styleSix.leftPrint.left.split('px')[0]));
      setLeftTop(parseInt(styleSix.leftPrint.top.split('px')[0]));
      setLeftWidth(parseInt(styleSix.leftPrint.width.split('px')[0]));
      setLeftHeight(parseInt(styleSix.leftPrint.height.split('px')[0]));

      setRightLeft(parseInt(styleSix.rightPrint.left.split('px')[0]));
      setRightTop(parseInt(styleSix.rightPrint.top.split('px')[0]));
      setRightWidth(parseInt(styleSix.rightPrint.width.split('px')[0]));
      setRightHeight(parseInt(styleSix.rightPrint.height.split('px')[0]));
    }else if ( cur ===7){
      setLeftLeft(parseInt(styleSeven.leftPrint.left.split('px')[0]));
      setLeftTop(parseInt(styleSeven.leftPrint.top.split('px')[0]));
      setLeftWidth(parseInt(styleSeven.leftPrint.width.split('px')[0]));
      setLeftHeight(parseInt(styleSeven.leftPrint.height.split('px')[0]));

      setRightLeft(parseInt(styleSeven.rightPrint.left.split('px')[0]));
      setRightTop(parseInt(styleSeven.rightPrint.top.split('px')[0]));
      setRightWidth(parseInt(styleSeven.rightPrint.width.split('px')[0]));
      setRightHeight(parseInt(styleSeven.rightPrint.height.split('px')[0]));
    }

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
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftLeft(leftLeft -1);
      }else{
        setRightLeft(rightLeft -1);
      }
    }else{
      setLeft(left -1);
    }
  };
  const handleRight = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftLeft(leftLeft +1);
      }else{
        setRightLeft(rightLeft +1);
      }
    }else{
      setLeft(left +1);
    }
  }

  const handleUp = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftTop(leftTop -1);
      }else{
        setRightTop(rightTop -1);
      }
  }else{
    setTop(top -1);
  }
}

  const handleDown = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftTop(leftTop +1);
      }else{
        setRightTop(rightTop +1);
      }
    }else{
      setTop(top +1);
    }
  }

  const handleWidthAdd = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftWidth(leftWidth +1);
      }else{
        setRightWidth(rightWidth +1);
      }
  }else{
    setWidth(width +1);
  }
  }

  const handleWidthSub = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftWidth(leftWidth -1);
      }else{
        setRightWidth(rightWidth -1);
      }
  }else{
    setWidth(width - 1);
  }
  }

  const handleHeightAdd = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftHeight(leftHeight +1);
      }else{
        setRightHeight(rightHeight +1);
      }
  }else{
    setHeight(height +1);
  }
}

  const handleHeightSub = () => {
    if (curNumber >= 6){
      if (curEditing === 'left'){
        setLeftHeight(leftHeight -1);
      }else{
        setRightHeight(rightHeight -1);
      }
  }else{
    setHeight(height -1);
  }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(prev => {
      if (curNumber >= 6){
        if (curEditing === 'left'){
          setLeftWidth(leftWidth + parseInt(e.target.value) - prev);
          setLeftHeight(leftHeight + parseInt(e.target.value) - prev);
      }else{
        setRightWidth(rightWidth + parseInt(e.target.value) - prev);
        setRightHeight(rightHeight + parseInt(e.target.value) - prev);
      }
    }
      else{
      setWidth(width + parseInt(e.target.value) - prev);
      setHeight(height + parseInt(e.target.value) - prev);
      }
      
      return prev + (parseInt(e.target.value) - prev)
    });

  };

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
            <div style={
              {
                ...styleTwo.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : curNumber === 3 ? (
          <div style={styleThree.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleThree.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : curNumber === 4 ? (
          <div style={styleFour.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleFour.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        )  : curNumber === 5 ? (

        <div style={styleFive.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleFive.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>

          )

          : curNumber === 6 ? (
            <div style={styleSix.bgContainer as CSSProperties} ref={ref}>
              {isUploaded &&
              <div style={{
                minWidth: styleSix.bgContainer.width,
                minHeight: styleSix.bgContainer.height,
                maxWidth: styleSix.bgContainer.width,
                maxHeight: styleSix.bgContainer.height,
              }}>
                <img src={imageUrl} style={
                  {
                    ...styleSix.leftPrint,
                    left: `${leftLeft}px`,
                    top: `${leftTop}px`,
                    width: `${leftWidth}px`,
                    height: `${leftHeight}px`,
                  } as CSSProperties
                  
                } alt="print Image" />
                <img src={imageUrl} style={
                  {
                    ...styleSix.rightPrint,
                    left: `${rightLeft}px`,
                    top: `${rightTop}px`,
                    width: `${rightWidth}px`,
                    height: `${rightHeight}px`,
                  } as CSSProperties
                } alt="print Image" 
                />
              </div>

              }
          </div>
          )  : 
          <div style={styleSeven.bgContainer as CSSProperties} ref={ref}>
            {
              isUploaded && 
              <div style={{
                minWidth: styleSeven.bgContainer.width,
                minHeight: styleSeven.bgContainer.height,
                maxWidth: styleSeven.bgContainer.width,
                maxHeight: styleSeven.bgContainer.height,
              }}>
                <img src={imageUrl} style={
                  {
                    ...styleSeven.leftPrint,
                    left: `${leftLeft}px`,
                    top: `${leftTop}px`,
                    width: `${leftWidth}px`,
                    height: `${leftHeight}px`,
                  } as CSSProperties
                  }
                 alt="print Image" />
                <img src={imageUrl} style={
                  {
                    ...styleSeven.rightPrint,
                    left: `${rightLeft}px`,
                    top: `${rightTop}px`,
                    width: `${rightWidth}px`,
                    height: `${rightHeight}px`,
                  } as CSSProperties
                  
                } alt="print Image" />
              </div>
            }
          </div>
      )
      : (
        <div className='please'>
          upload the print, we can handle generating the images and downloading them for you
        </div>
      )}

      {isUploaded && (
        <main className='main'>
        {curNumber >= 6  && 
        <div className='left-right-btns'>
          <button onClick={() => setCurEditing('left')}
          style=
            {{
              backgroundColor: curEditing === 'left' ? '#388E3C' : '#4CAF50',
            
             } as CSSProperties}          
          >edit left</button>
          <button onClick={() => setCurEditing('right')}

          style=
            {{
              backgroundColor: curEditing === 'right' ? '#388E3C' : '#4CAF50',
            
             } as CSSProperties}
          
          >edit right</button>
        </div>

        }
          <div className='num-container'>
            <button onClick={() => flipTo(1)} 
            style={
              {
                backgroundColor: curNumber === 1 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-1</button>
            <button onClick={() => flipTo(2)} 
            style={
              {
                backgroundColor: curNumber === 2 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-2</button>
            <button onClick={() => flipTo(3)}
            style={
              {
                backgroundColor: curNumber === 3 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-3</button>
            <button  onClick={() => flipTo(4)} 
            style={
              {
                backgroundColor: curNumber === 4 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-4</button>
            <button  onClick={() => flipTo(5)} 
            style={
              {
                backgroundColor: curNumber === 5 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-5</button>
            <button  onClick={() => flipTo(6)} 
            style={
              {
                backgroundColor: curNumber === 6 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-6</button> 
            <button  onClick={() => flipTo(7)} 
            style={
              {
                backgroundColor: curNumber === 7 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >bg-7</button>
          </div>

          <div className='adjuster-cont'>

            <button className='adjuster' onClick={handleLeft}><FaChevronLeft /></button>
            <button className='adjuster' onClick={handleRight}><FaChevronRight /></button>
            <button className='adjuster' onClick={handleUp}><FaChevronUp /></button>
            <button className='adjuster' onClick={handleDown}><FaChevronDown /></button>
            
          </div>

          <div className="slider-container">
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={value}
              onChange={handleChange} 
            />
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
        </main>
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
