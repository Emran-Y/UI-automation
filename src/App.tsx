import  { useCallback, useRef, useState, CSSProperties } from 'react';
import { toPng} from 'html-to-image';
import './App.css';
import {styleOne,styleTwo,styleThree,styleFour,styleFive,styleSix,styleSeven,styleEight} from './styles';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { DiVim } from 'react-icons/di';



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

 

 

  const flipTo = (cur:number) => {
    setCurNumber(cur);
    setValue(20);
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
      setLeft(parseInt(styleSix.printContainer.left.split('px')[0]));
      setTop(parseInt(styleSix.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleSix.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleSix.printContainer.height.split('px')[0]));
    } else if (cur ===7){
      setLeft(parseInt(styleSeven.printContainer.left.split('px')[0]));
      setTop(parseInt(styleSeven.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleSeven.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleSeven.printContainer.height.split('px')[0]));
    } else if (cur ===8){
      setLeft(parseInt(styleEight.printContainer.left.split('px')[0]));
      setTop(parseInt(styleEight.printContainer.top.split('px')[0]));
      setWidth(parseInt(styleEight.printContainer.width.split('px')[0]));
      setHeight(parseInt(styleEight.printContainer.height.split('px')[0]));
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
      setLeft(left -1);
  };
  const handleRight = () => {
      setLeft(left +1);
  }

  const handleUp = () => {
    setTop(top -1);
}

  const handleDown = () => {
   
      setTop(top +1);
  }

  const handleWidthAdd = () => {
    setWidth(width +1);
  }

  const handleWidthSub = () => {
    setWidth(width - 1);
  }

  const handleHeightAdd = () => {
    setHeight(height +1);
}

  const handleHeightSub = () => {
    setHeight(height -1);
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(prev => {
      setWidth(width + parseInt(e.target.value) - prev);
      setHeight(height + parseInt(e.target.value) - prev);
      
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

          ) : curNumber === 6 ? (
          
            <div style={styleSix.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleSix.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
              
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : curNumber === 7 ?
        (
          <div style={styleSeven.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleSeven.printContainer,
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
              } as CSSProperties
              
            }>
              {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
            </div>
          </div>
        ) : 

        (
          <div style={styleEight.bgContainer as CSSProperties} ref={ref}>
            <div style={
              {
                ...styleEight.printContainer,
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
        
      )
      : null}

      {isUploaded && (
        <main className='main'>
          <div className='num-container'>
            <button onClick={() => flipTo(1)} 
            style={
              {
                backgroundColor: curNumber === 1 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-1</button>
            <button onClick={() => flipTo(2)} 
            style={
              {
                backgroundColor: curNumber === 2 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-2</button>
            <button onClick={() => flipTo(3)}
            style={
              {
                backgroundColor: curNumber === 3 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-3</button>
            <button  onClick={() => flipTo(4)} 
            style={
              {
                backgroundColor: curNumber === 4 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-4</button>
            <button  onClick={() => flipTo(5)} 
            style={
              {
                backgroundColor: curNumber === 5 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-5</button>

            <button  onClick={() => flipTo(6)} 
            style={
              {
                backgroundColor: curNumber === 6 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-6</button>
            <button  onClick={() => flipTo(7)}
            style={
              {
                backgroundColor: curNumber === 7 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-7</button>
            <button onClick={() => flipTo(8)}
            style={
              {
                backgroundColor: curNumber === 8 ? '#12d68e' : '#04AA6D',
              } as CSSProperties
            }
            >studio-8</button>
            
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
            <button onClick={handleWidthAdd} >Width +</button>
            <button onClick={handleWidthSub}>Width -</button>
            <button onClick={handleHeightAdd}>Height +</button>
            <button onClick={handleHeightSub}>Height -</button>
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
            Upload Image
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
