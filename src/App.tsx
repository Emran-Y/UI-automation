import { useCallback, useRef,useState,useEffect, CSSProperties } from 'react';
import { toPng } from 'html-to-image';
import './App.css'
import { styleOne } from './styles';
import { styleTwo } from './styles';
import { styleThree } from './styles';
import { styleFour } from './styles';

function App() {



  
  const [curNumber, setCurNumber] = useState(1);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback((cur: number) => {
    setCurNumber(cur);
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
  


  
   
    
    const imageToBeGenerated1 = (
      <div style={styleOne.bgContainer as CSSProperties} ref={ref}>
        <img src={`/backgrounds/background1.png`} className='bg-image' alt='bg-image' />
        <div style={styleOne.printContainer as CSSProperties}>
          {/* <img src="prints/print1.jpg" className='print-image' alt="print Image" /> */}
        { isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
        </div>
      </div>
    );

    const imageToBeGenerated2 = (
      <div style={styleTwo.bgContainer as CSSProperties} ref={ref}>
        <div style={styleTwo.printContainer as CSSProperties}>
          {/* <img src="prints/print1.jpg" className='print-image' alt="print Image" /> */}
        {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
        </div>
      </div>
    );  
    
    const imageToBeGenerated3 = (
      <div style={styleThree.bgContainer as CSSProperties} ref={ref}>
        <div style={styleThree.printContainer as CSSProperties}>
          {/* <img src="prints/print1.jpg" className='print-image' alt="print Image" /> */}
        {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
        </div>
      </div>
    );
    

    const imageToBeGenerated4 = (
      <div style={styleFour.bgContainer as CSSProperties} ref={ref}>
        <div style={styleFour.printContainer as CSSProperties}>
          {/* <img src="prints/print1.jpg" className='print-image' alt="print Image" /> */}
        {isUploaded && <img src={imageUrl} className='print-image' alt="print Image" />}
        </div>
      </div>
    );
    
    
    
    const handleFileChange = useCallback((image: File) => {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'tohco7vu');
  
      fetch(`https://api.cloudinary.com/v1_1/difavbhph/image/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageURL(data.secure_url);
          setIsUploaded(true);
          setIsUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsUploading(false);
        });
    }, []);

 


  return (
    <div className='container'>
       { isUploaded  ?  (curNumber === 1 ? imageToBeGenerated1 : curNumber === 2 ? imageToBeGenerated2 : curNumber === 3 ? imageToBeGenerated3 : imageToBeGenerated4): 

       
        <div>
          the image will be here
        </div>

       }

      

      
      { isUploaded &&
        <div className='btns'>
        <button onClick={() => onButtonClick(1)}>Download Image 1</button>
        <button onClick={() => onButtonClick(2)}>Download Image 2</button>
        <button onClick={() => onButtonClick(3)}>Download Image 3</button>
        <button onClick={() => onButtonClick(4)}>Download Image 4</button>
      </div>
      }

      {
      !isUploaded &&
      <div className='my-input-form'>
      <input
          id='profile-pic'
          type='file'
          accept='image/*'
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          className='fileInput'
        />

      {isUploading && <p>Uploading...</p>}
      </div>
      } 

    </div>
  )
}

export default App
