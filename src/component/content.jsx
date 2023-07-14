import React, { useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [randomImage, setRandomImage] = useState(''); 
  const [allMemeImages, setAllMemeImages] = useState([]); 

  
  useEffect(() => {
   
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => setAllMemeImages(data.images))
      .catch(error => console.error(error));
  }, []);

 
  const handleSubmit = (event) => {
    event.preventDefault();


    const randomIndex = Math.floor(Math.random() * allMemeImages.length);
    const randomMemeImage = allMemeImages[randomIndex];

    setRandomImage(randomMemeImage);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Texte en haut"
          value={topText}
          onChange={event => setTopText(event.target.value)}
        />
        <input
          type="text"
          placeholder="Texte en bas"
          value={bottomText}
          onChange={event => setBottomText(event.target.value)}
        />
        <button type="submit">Générer un mème aléatoire</button>
      </form>

      {randomImage && (
        <div>
          <img src={randomImage} alt="Mème aléatoire" />
          <h2>{topText}</h2>
          <h2>{bottomText}</h2>
        </div>
      )}
    </div>
  );
}

export default MemeGenerator;
