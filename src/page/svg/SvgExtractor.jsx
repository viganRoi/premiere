import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../utils/consts';
import 'react-toastify/dist/ReactToastify.css';

const SvgExtractor = ( { show } ) => {
  const [svgCode, setSvgCode] = useState('');
  const[elementIndex, setElementIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState(['', ''])
  const [extractedElements, setExtractedElements] = useState(
    {
      viewBoxStyle: "",
      imageTransform: "",
      imageWidth: "",
      imageHeight: "",
      imageUrl: "",
      className: "",
      style: "",
      floorId: null,
      apartmentDTO: [],
      maxFloor: 0,
      buildingSide: 0,
      buildingName: '',
      buildingNumber: 0,
      neighborhood: '',
    }
  );

  const handleSvgCodeChange = (event) => {
    setSvgCode(event.target.value);
  };

  const [inputVal, setInputVal] = useState({
    name: '',
    apartmentNumber: '',
    rooms: '',
    floor: 0,
    square: 0,
    balconySquare: 0,
    buildingSide: 0,
    isSold: false,
    buildingNr: '',
    maxFloor: 0,
  })
  
  const extractSvgElements = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, 'image/svg+xml');
    let elements = {};
    const pathsList = []
    const svgElement = doc.querySelector('svg');
    if (svgElement) {
      const viewBox = svgElement.getAttribute('viewBox');
      elements.viewBoxStyle = viewBox;
    }
    const imgElement = doc.querySelector('image');
    console.log(doc)
    if (imgElement) {
      const width = imgElement.getAttribute('width');
      const height = imgElement.getAttribute('height')
      const transform = imgElement.getAttribute('transform')
      elements.imageHeight = height;
      elements.imageTransform = transform;
      elements.imageWidth = width;
      }
      let array = []
    selectedTags.forEach((tag) => {
      if(tag.length > 1){
        const selectedElements = doc.querySelectorAll(tag);
      selectedElements.forEach((element) => {
        const attributes = Array.from(element.attributes);
        const attributesObject = attributes.reduce((acc, attr) => {
          if(attr.name === 'points' || attr.name === 'd'){
            acc["path"] = attr.value
            
            if(attr.name === 'points'){
              acc['pointsType'] = 'polygon';
            }
            if(attr.name === 'd'){
              acc['pointsType'] = 'path';
            }
            return acc;
          }
          acc[attr.name] = attr.value;
          return acc;
        }, {});
        array.push(attributesObject)
      });
      setExtractedElements({
        ...extractedElements,
        apartmentDTO: array,
        imageHeight: elements.imageHeight,
        imageTransform: elements.imageTransform,
        imageWidth: elements.imageWidth,
        viewBoxStyle: elements.viewBoxStyle

      })
      }
    });
  };
  const handleAddAdditionalAttrToList = () => {
    const arrayToSave = extractedElements.paths[elementIndex];
    arrayToSave['name'] = inputVal.name
    arrayToSave['square'] = inputVal.square
    arrayToSave['floor'] = inputVal.floor
    arrayToSave['rooms'] = inputVal.rooms
    arrayToSave['balconySquare'] = inputVal.balconySquare
    console.log(inputVal.name)
    
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      viewBoxStyle: extractedElements.viewBoxStyle,
      imageTransform: extractedElements.imageTransform,
      imageWidth: extractedElements.imageWidth,
      imageHeight: extractedElements.imageHeight,
      imageUrl: extractedElements.imageUrl,
      floorNumber: extractedElements.floorId,
      apartmentDTO: extractedElements.apartmentDTO,
      className: extractedElements.className,
      style: extractedElements.style,
      maxFloor: extractedElements.maxFloor,
      buildingName: extractedElements.buildingName,
      buildingNr: extractedElements.buildingNumber,
      buildingSide: extractedElements.buildingSide,
      neighborhood: extractedElements.neighborhood,
    };
      const responseWrapper = (dataa) =>
      axios.post(`${BASE_URL}/api/apartment/create/list`, dataa);
      toast.promise(responseWrapper(data), {
        pending: 'Kërkesa juaj është duke u procesuar!',
        success: 'Dokumenti u ruajt me sukses',
        error: 'Ruajtja e dokumentit ka deshtuar',
        position: 'top-right'
      });
        
    }
  
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleRandomGenerateAll = () => {
    const arrayToSave = extractedElements.apartmentDTO;
  
    for (let i = 0; i < arrayToSave.length; i++) {
      const randomNumber =  `Njesia ${generateRandomNumber(1, 100)}`;
      const squarenr = generateRandomNumber(59, 141)
      arrayToSave[i].apartmentName = randomNumber;
      const nr =  Math.floor(Math.random() * 4) + 1;
      arrayToSave[i].rooms = `${nr}+${1}`
      arrayToSave[i].isSold = false
      arrayToSave[i].apartmentNumber = 95
      arrayToSave[i].floorNumber = nr
      arrayToSave[i].square = squarenr
      arrayToSave[i].buildingNr = 0
      arrayToSave[i].balconySquare = generateRandomNumber(1, 20)
      arrayToSave[i].maxFloor = inputVal.maxFloor
      arrayToSave[i].minSquare = 0
      arrayToSave[i].maxSquare = 0
      arrayToSave[i].apartmentId = generateRandomNumber(1, 1000)

    }
    setExtractedElements({
      ...extractedElements,
      
      
    })
  }

  const addBuildingSide = () => {
    const arrayToSave = extractedElements.apartmentDTO;

    for (let i = 0; i < arrayToSave.length; i++) {
      arrayToSave[i].buildingSide = inputVal.buildingSide;
    }
    setExtractedElements({
      ...extractedElements,
    });
  }
const addBuildingNr = () => {
    
  const arrayToSave = extractedElements.apartmentDTO;

  for (let i = 0; i < arrayToSave.length; i++) {
    arrayToSave[i].buildingNr = inputVal.buildingNr
}
setExtractedElements({
  ...extractedElements,
  
  
})
}
const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelectedTags(prevItems => {
      if (prevItems.includes(value)) {
        return prevItems;
      } else {
        return [...prevItems, value];
      }
    });
  } else {
    setSelectedTags(prevItems => prevItems.filter(item => item !== value));
  }
};
  return (
    <div style={{ display: !show ? "block" : "none", padding: 10, paddingTop: 70 }}>
      <ToastContainer />
      <h2>Shto Apartamentet</h2>
      <div style={{ display: "flex", gap: 20 }}>
        <div>
          <textarea
            rows={10}
            cols={50}
            placeholder="Paste SVG code here"
            value={svgCode}
            onChange={handleSvgCodeChange}
          />
          <div>
            <label>
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}} type="checkbox" onChange={handleCheckboxChange} value="image" /> Image
            </label>
            <label>
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}} type="checkbox" onChange={handleCheckboxChange} value="path" /> Path
            </label>
            <label>
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}} type="checkbox" onChange={handleCheckboxChange} value="polygon" /> Polygon
            </label>
          </div>
          <button
            onClick={() => {
              const selectedTags = ["image", "path", "polygon"].filter(
                (tag) => document.querySelector(`input[value="${tag}"]`).checked
              );
              extractSvgElements(selectedTags);
            }}
          >
            Extract Elements
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ display: "flex", gap: 20 }}>
              <label>Antari: {elementIndex}</label>
              <label>
                Gjithsej: {extractedElements.paths?.length} Antar ne List
              </label>
              <label>
                {extractedElements.paths?.length - elementIndex} Antar Te Mbetur
              </label>
            </div>
            <div>
              <button
                onClick={() => {
                  if (elementIndex >= extractedElements.paths?.length) {
                    return;
                  }
                  setElementIndex(elementIndex + 1);
                  const arrayToSave = extractedElements?.paths[elementIndex];
                  setInputVal({
                    ...inputVal,
                    square: arrayToSave["square"],
                    name: arrayToSave["name"],
                    floor: arrayToSave["floor"],
                    rooms: arrayToSave["rooms"],
                    balconySquare: arrayToSave["balconySquare"],
                  });
                }}
              >
                Antari Radhes
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Siperfaqja
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    square: e.currentTarget.value,
                  });
                }}
                value={inputVal.square}
                type="text"
                name="square"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Kati
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    floor: e.currentTarget.value,
                  });
                }}
                value={inputVal.floor}
                type="text"
                name="floor"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Tipi
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    rooms: e.currentTarget.value,
                  });
                }}
                value={inputVal.rooms}
                type="text"
                name="rooms"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Ndertesa
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    buildingNumber: e.currentTarget.value,
                  });
                }}
                value={extractedElements.buildingNumber}
                type="text"
                name="buildingNumber"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Nr. Baneses
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    apartmentNumber: e.currentTarget.value,
                  });
                }}
                value={inputVal.apartmentNumber}
                type="text"
                name="apartmentName"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Terrasa
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setInputVal({
                    ...inputVal,
                    balconySquare: e.currentTarget.value,
                  });
                }}
                value={inputVal.balconySquare}
                type="text"
                name="balconySquare"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Ana e Baneses
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    buildingSide: e.currentTarget.value,
                  });
                }}
                value={extractedElements.buildingSide}
                type="text"
                name="buildingSide"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Emri Baneses
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    buildingName: e.currentTarget.value,
                  });
                }}
                value={extractedElements.buildingName}
                type="text"
                name="apartmentName"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Kati maksimal
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    maxFloor: parseInt(e.currentTarget.value),
                  });
                }}
                value={extractedElements.maxFloor}
                type="number"
                name="maxFloor"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Url e fotos
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    imageUrl: e.currentTarget.value,
                  });
                }}
                value={extractedElements.imageUrl}
                type="text"
                name="urlImg"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Projekti (Lagja)
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    neighborhood: e.currentTarget.value,
                  });
                }}
                value={extractedElements.neighborhood}
                type="text"
                name="neighborhood"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Numri i katit
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}}
                onChange={(e) => {
                  setExtractedElements({
                    ...extractedElements,
                    floorId: Number.parseFloat(e.currentTarget.value),
                  });
                }}
                value={extractedElements.floorId}
                type="text"
                name="numriKatit"
              />
            </label>
            
            <label>
              <input style={{border: '1px solid #DDD', padding: '2px', borderRadius: '5px'}} type="checkbox" name="isSold" />
              Shitur
            </label>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <div>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500px",
                  border: '1px solid #33363F',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }} onClick={handleAddAdditionalAttrToList}>
                  Shto ne List
                </button>
              </div>
              <div>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500px",
                  border: '1px solid #33363F',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }}
                  onClick={() => {
                    handleRandomGenerateAll();
                  }}
                >
                  Gjenero Random Vlerat
                </button>
              </div>
              <div>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500px",
                  border: '1px solid #33363F',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }} onClick={addBuildingSide}>Shto Building Side</button>
              </div>
              <div>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500px",
                  border: '1px solid #33363F',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }} onClick={addBuildingNr}>Shto Building Number</button>
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500px",
                  border: '1px solid #33363F',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }}
              >
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14L9 17L18 6" stroke="#33363F" strokeWidth="2"/>
                </svg>
                Ruaj Ne Server
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          overflow: "auto",
          maxWidth: "fit-content",
          maxHeight: "fit-content",
          height: "500px",
          marginTop: 50,
          userSelect: "text",
        }}
      >
        Lista perfundimtare:
        <pre>{JSON.stringify(extractedElements, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SvgExtractor;
